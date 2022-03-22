import Card from "../molecules/Card";
import React, {useEffect, useState} from "react";
import {generateUpdatedCard} from "../../services/card";
import {store} from "react-notifications-component";
import {memorisedNotification, streakNotification} from "../../services/notification";
import {viewportContext} from "../../contexts/viewport";
import {getFromServer, postOnServer} from "../../server";
import {intervals} from "../../data/cards";

export default function ReviewPage() {
  const [isLoading, setLoadingState] = useState(false);
  const [card, setCard] = useState(null);
  const {isMobile} = React.useContext(viewportContext);
  const [remainingCards, setRemainingCards] = useState(0);

  useEffect(fetchCard, []);


  return (
    <div className="ReviewPage">
      <h4>Révisons ! ({remainingCards})</h4>
      {!isLoading && card && (
        <Card
          data={card}
          onAnswer={(isSuccess) => handleAnswer(isSuccess)}
          onUpdate={fetchCard}
          isSingle
        />
      )}
    </div>
  )

  /**
   * Fetch one card the user has to answer
   */
  function fetchCard() {
    setLoadingState(true);
    getFromServer('/userCards/getOne').then(({data}) => {
      setLoadingState(false);
      setCard(data.card);
      setRemainingCards(data.remainingCards)
    })
  }


  /**
   * If the answer is wrong, we go back to the previous interval so it appears earlier
   * If the answer is right, we increment the interval so it appears later
   * @param isSuccess
   */
  function handleAnswer(isSuccess) {
    // Get data
    const updatedCard = generateUpdatedCard(card, isSuccess);

    if (updatedCard.isMemorized) {
      store.addNotification({
        ...memorisedNotification,
        message: `Vous avez mémorisé la carte ${updatedCard.answer} ! Félicitations !`,
        container: isMobile ? "bottom-center" : "top-right",
      });
    }


    // TODO - Disable this line if you want the streak effect back.
    tryToDisplayStreakNotification(updatedCard.currentSuccessfulAnswerStreak);

    triggerCardUpdate(updatedCard);
  }


  /**
   * If the parameter >= 3,
   * Display the current successful answer streak notification
   * Else, do nothing
   * @param currentSuccessfulAnswerStreak Number, the current amount of successful answers
   * the user gave.
   */
  function tryToDisplayStreakNotification(currentSuccessfulAnswerStreak) {
    const shouldDisplayStreakNotification = currentSuccessfulAnswerStreak >= 3
    if (shouldDisplayStreakNotification) {
      store.addNotification({
        ...streakNotification,
        message: `${currentSuccessfulAnswerStreak} à la suite !`,
        container: isMobile ? "bottom-center" : "top-right",
      });
    }
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card) {
    postOnServer(`/userCards/update/${card.cardId}`,
      {newDelay: card.currentDelay || intervals[1], isMemorized: card.isMemorized})
      .then(fetchCard);
  }
}