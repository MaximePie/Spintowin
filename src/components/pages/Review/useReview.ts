// @ts-ignore
/* eslint-disable */

import { useContext, useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { Store } from 'react-notifications-component';
import {QueryClient, useQuery, useQueryClient} from 'react-query';
import { getFromServer, postOnServer } from '../../../services/server';
import { viewportContext } from '../../../contexts/viewport';
import generateUpdatedCard from '../../../services/card';
import { memorisedNotification } from '../../../services/notification';
import UserCard from '../../../types/UserCard';
import intervals from "../../../data/cards";

export default function useReview() {
  const queryClient = useQueryClient()
  const [remainingCards, setRemainingCards] = useState<number | undefined>(0);
  const { isMobile } = useContext(viewportContext);
  const { isLoading, error, data } = useQuery('card', fetchCard);
  const currentCard = data?.card || null;


  const [categories, setCategories] = useState<string[]>([]);
  const [score, setScore] = useState({
    numberOfSuccess: 0,
    numberOfFailures: 0,
  });

  const [answerTimeStart, setAnswerTimeStart] = useState<Date | null>(null);

  useEffect(() => {
    if (currentCard) {
      setAnswerTimeStart(new Date());
    }
  }, [currentCard]);

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [categories]);

  useEffect(() => {
    if (data?.remainingCards) {
      setRemainingCards(data.remainingCards);
    }
  }, [data])

  /**
   * Invalidates the queries
   */
  function refetch() {
    queryClient.invalidateQueries('card');
  }

  function fetchCard() {
    return postOnServer('/userCards/getOne', categories).then((response) => response.data);
  }

  /**
   * Updates the current categories
   * @param newValue
   */
  function updateCategories(newValue: MultiValue<{label: string, value: string}>) {
    const newCategories = newValue.map((category) => category.value);
    setCategories(newCategories);
  }

  /**
   * If the answer is wrong, we go back to the previous interval so it appears earlier
   * If the answer is right, we increment the interval so it appears later
   * @param isSuccess {boolean}
   */
  function handleAnswer(isSuccess: boolean) {
    // Get data
    const updatedCard = generateUpdatedCard(currentCard!, isSuccess);

    if (updatedCard.isMemorized) {
      Store.addNotification({
        ...memorisedNotification,
        message: `Vous avez m??moris?? la carte ${updatedCard.answer} ! F??licitations !`,
        container: isMobile ? 'bottom-center' : 'top-right',
      });
    }

    if (isSuccess) {
      // setNumberOfSuccess(numberOfSuccess + updatedCard.currentSuccessfulAnswerStreak)
      setScore({
        ...score,
        numberOfSuccess: score.numberOfSuccess + 1,
      });
    } else {
      setScore({
        ...score,
        numberOfFailures: score.numberOfFailures + 1,
      });
    }

    if (remainingCards) {
      setRemainingCards(remainingCards - 1);
    }

    triggerCardUpdate(updatedCard);
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param updatedCard
   */
  function triggerCardUpdate(updatedCard: UserCard) {
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
    ).then(refetch)
  }

  return {
    remainingCards,
    score,
    isLoading,
    error,
    data,
    currentCard,
    refetch,
    updateCategories,
    handleAnswer,
  };
}
