import React, {useState} from 'react';
import {intervals,} from "../../data/cards"
import Card from "./Card";

import {Link} from "react-router-dom";

export default function Cards({cardsList, triggerCardUpdate, remainingCards}) {

  const [isScoreDisplayed, setScoreDisplayState] = useState(false);
  const [shouldCardsBeInverted, setInvertedState] = useState(false);

  return (
    <div className="Cards">
      <div className="Card Card--static">
        <p className="Card__answer">{remainingCards} cartes</p>
        <div>
          <label className="Card--static__label">
            <input
              type="checkbox"
              onChange={(event) => setScoreDisplayState(event.target.checked)}
              value={isScoreDisplayed}
            />
            Afficher le score
          </label>
        </div>
        <div>
          <label className="Card--static__label">
            <input
              type="checkbox"
              onChange={(event) => setInvertedState(event.target.checked)}
              value={shouldCardsBeInverted}
            />
            Inverser
          </label>
        </div>
      </div>
      {!cardsList.length && <p>Pas de cartes pour le moment, <Link to="add">créez-en quelques unes</Link> !</p>}
      {cardsList.map(card =>
        <Card
          data={card}
          key={card._id}
          onAnswer={(isSuccess) => handleAnswer(card._id, isSuccess)}
          isScoreDisplayed={isScoreDisplayed}
          shouldCardsBeInverted={shouldCardsBeInverted}
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
    } else if (isSuccess && currentDelayIndex !== 0) {
      let newDelayIndex = currentDelayIndex;
      if (updatedCard.currentSuccessfulAnswerStreak) {
        newDelayIndex += updatedCard.currentSuccessfulAnswerStreak;
      }
      else {
        newDelayIndex += 1;
      }
      updatedCard.currentDelay = intervals[newDelayIndex];
      console.log(newDelayIndex);
    } else {
      updatedCard.currentDelay = intervals[currentDelayIndex - 1];
    }

    triggerCardUpdate(updatedCard);
  }

}
