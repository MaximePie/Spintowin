import React from 'react';
import {intervals,} from "../../data/cards"
import Card from "./Card";

import {Link} from "react-router-dom";

export default function Cards({cardsList, triggerCardUpdate, remainingCards}) {
  return (
    <div className="Cards">
      <div className="Card">
        <p className="Card__answer">{remainingCards} cartes</p>
      </div>
      {!cardsList.length && <p>Pas de cartes pour le moment, <Link to="add">créez-en quelques unes</Link> !</p>}
      {cardsList.map(card =>
        <Card
          data={card}
          key={card._id}
          onAnswer={(isSuccess) => handleAnswer(card._id, isSuccess)}
        />)}
    </div>
  );


  /**
   * If the answer is wrong, we go back to the first interval : 15 seconds
   * If the answer is right, we increment de interval so it appears later
   * @param cardId
   * @param isSuccess
   */
  function handleAnswer(cardId, isSuccess) {
    // Get data
    const targetCard = cardsList.find((card) => card._id === cardId);

    let updatedCard = {...targetCard};
    const currentDelayIndex = intervals.indexOf(updatedCard.currentDelay);

    // Edit data
    if (!updatedCard.currentDelay) {
      updatedCard.currentDelay = intervals[1];
    }
    else if (isSuccess && currentDelayIndex !== 0) {
      const newDelayIndex = currentDelayIndex + updatedCard.currentSuccessfulAnswersStreak;
      updatedCard.currentDelay = intervals[newDelayIndex];
    } else {
      updatedCard.currentDelay = intervals[currentDelayIndex - 1];
    }

    triggerCardUpdate(updatedCard);
  }

}
