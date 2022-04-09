import React, { useContext, useEffect, useState } from 'react';
import { Store } from 'react-notifications-component';
import Card from '../molecules/Card';
import UserCardType from '../../types/UserCard';
import generateUpdatedCard from '../../services/card';
import { memorisedNotification, streakNotification } from '../../services/notification';
import { viewportContext } from '../../contexts/viewport';
import { getFromServer, postOnServer } from '../../services/server';
import intervals from '../../data/cards';

export default function ReviewPage() {
  const [isLoading, setLoadingState] = useState(false);
  const [card, setCard] = useState(null);
  const { isMobile } = useContext(viewportContext);
  const [remainingCards, setRemainingCards] = useState(0);

  const [numberOfSuccess, setNumberOfSuccess] = useState(0);
  const [numberOfFailures, setNumberOfFailures] = useState(0);

  const [answerTimeStart, setAnswerTimeStart] = useState<Date | null>(null);

  const isCancelled = React.useRef(false);

  useEffect(() => {
    if (!isCancelled.current) {
      fetchCard();
    }
    return () => {
      isCancelled.current = true;
    };
  }, []);

  useEffect(() => {
    setAnswerTimeStart(new Date());
  }, [card]);

  return (
    <div className="ReviewPage">
      <h4 className="ReviewPage__header">
        Révisons ! (
        {remainingCards}
        )
      </h4>
      <p>
        <i className="ReviewPage__success">{numberOfSuccess}</i>
        /
        <i className="ReviewPage__failures">{numberOfFailures}</i>
      </p>
      {!isLoading && card && (
        <Card
          data={card}
          onAnswer={(isSuccess: boolean) => handleAnswer(isSuccess)}
          onUpdate={fetchCard}
          isSingle
          isScoreDisplayed
          shouldCardsBeInverted={false}
        />
      )}
    </div>
  );

  /**
   * Fetch one card the user has to answer
   */
  function fetchCard() {
    setLoadingState(true);
    getFromServer('/userCards/getOne').then(({ data }) => {
      setLoadingState(false);
      setCard(data.card);
      setRemainingCards(data.remainingCards);
    });
  }

  /**
   * If the answer is wrong, we go back to the previous interval so it appears earlier
   * If the answer is right, we increment the interval so it appears later
   * @param isSuccess {boolean}
   */
  function handleAnswer(isSuccess: boolean) {
    // Get data
    const updatedCard = generateUpdatedCard(card, isSuccess);

    if (updatedCard.isMemorized) {
      Store.addNotification({
        ...memorisedNotification,
        message: `Vous avez mémorisé la carte ${updatedCard.answer} ! Félicitations !`,
        container: isMobile ? 'bottom-center' : 'top-right',
      });
    }

    if (isSuccess) {
      // setNumberOfSuccess(numberOfSuccess + updatedCard.currentSuccessfulAnswerStreak)
      setNumberOfSuccess(numberOfSuccess + 1);
    } else {
      setNumberOfFailures(numberOfFailures + 1);
    }

    // TODO - Disable this line if you want the streak effect back.
    tryToDisplayStreakNotification(updatedCard.currentSuccessfulAnswerStreak);

    triggerCardUpdate(updatedCard);
  }

  /**
   * If the parameter >= 3,
   * Display the current successful answer streak notification
   * Else, do nothing
   * @param currentSuccessfulAnswerStreak {number}, the current amount of successful answers
   * the user gave.
   */
  function tryToDisplayStreakNotification(currentSuccessfulAnswerStreak: number) {
    const shouldDisplayStreakNotification = currentSuccessfulAnswerStreak >= 3;
    if (shouldDisplayStreakNotification) {
      Store.addNotification({
        ...streakNotification,
        message: `${currentSuccessfulAnswerStreak} à la suite !`,
        container: isMobile ? 'bottom-center' : 'top-right',
      });
    }
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(updatedCard: UserCardType) {
    setCard(null);
    let answerTime = 0;
    if (answerTimeStart) {
      answerTime = new Date().getTime() - answerTimeStart.getTime();
    }
    answerTime = answerTime > 15000 ? 15000 : answerTime;

    postOnServer(
      `/userCards/update/${updatedCard.cardId}`,
      {
        newDelay: updatedCard.currentDelay || intervals[1],
        isMemorized: updatedCard.isMemorized || false,
        answerTime,
        isFromReviewPage: true,
      },
    )
      .then(fetchCard);
  }
}
