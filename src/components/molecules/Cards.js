import React, {useState} from 'react';
import {intervals,} from "../../data/cards"
import Card from "./Card";

import {Link} from "react-router-dom";
import {store} from "react-notifications-component";
import {memorisedNotification, streakNotification} from "../../services/notification";
import {viewportContext} from "../../contexts/viewport";
import LoadingGif from "../atoms/LoadingGif";


import {PropTypes} from 'prop-types';

Cards.propTypes = {
  cardsList: PropTypes.array,
  triggerCardUpdate: PropTypes.func.isRequired,
  fetchCards: PropTypes.func.isRequired,
  remainingCards: PropTypes.number,
  isLoading: PropTypes.bool,
};

Cards.defaultProps = {
  remainingCards: 0,
  isLoading: false,
};

export default function Cards({cardsList, triggerCardUpdate, remainingCards, fetchCards, isLoading}) {

  const [isScoreDisplayed, setScoreDisplayState] = useState(false);
  const [shouldCardsBeInverted, setInvertedState] = useState(false);
  const {isMobile} = React.useContext(viewportContext);

  return (
    <div className="Cards">
      <div className="Card Card--static">
        <p className="Card__answer">{remainingCards} cartes</p>
        <LoadingGif isLoading={isLoading} className="Cards__loading"/>
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
      {!isLoading && !cardsList.length && <p>Pas de cartes pour le moment, <Link to="add">créez-en quelques unes</Link> !</p>}
      {cardsList.map((card, index) =>
        <Card
          data={card}
          key={card._id}
          onAnswer={(isSuccess) => handleAnswer(card._id, isSuccess)}
          isScoreDisplayed={isScoreDisplayed}
          shouldCardsBeInverted={shouldCardsBeInverted}
          onUpdate={fetchCards}
        />)}
    </div>
  );


  /**
   * If the answer is wrong, we go back to the previous interval so it appears earlier
   * If the answer is right, we increment the interval so it appears later
   * @param cardId
   * @param isSuccess
   */
  function handleAnswer(cardId, isSuccess) {
    // Get data
    const targetCard = cardsList.find((card) => card._id === cardId);

    let updatedCard = {...targetCard};
    const currentDelayIndex = intervals.indexOf(updatedCard.currentDelay);
    const shouldIncreaseDelay = isSuccess && currentDelayIndex !== 0;

    // Edit data
    if (!updatedCard.currentDelay) { // Reset if interval does not exist
      console.log("resetting");
      console.log(updatedCard);
      updatedCard.currentDelay = intervals[1];
    } else if (shouldIncreaseDelay) {

      console.log("increasing");
      console.log(updatedCard);
      let newDelayIndex = currentDelayIndex;
      if (updatedCard.currentSuccessfulAnswerStreak) {
        newDelayIndex += updatedCard.currentSuccessfulAnswerStreak;
      }
      else {
        newDelayIndex += 1;
      }

      // If newDelayIndex is greater than the max interval, set it to memorised
      if (newDelayIndex >= intervals.length) {

        // Set to the last interval
        if(updatedCard.currentSuccessfulAnswerStreak > 1) {
          updatedCard.currentDelay = intervals[intervals.length]
          updatedCard.currentSuccessfulAnswerStreak = 0
        }
        else {
          // Set to memorized
          updatedCard.isMemorized = true;
          store.addNotification({
            ...memorisedNotification,
            message: `Vous avez mémorisé la carte ${updatedCard.answer} ! Félicitations !`,
            container: isMobile ? "bottom-center" : "top-right",
          });
        }
      }
      else {
        updatedCard.currentDelay = intervals[newDelayIndex];

        // TODO - Disable this line if you want the streak effect back.

        tryToDisplayStreakNotification(updatedCard.currentSuccessfulAnswerStreak)
      }
    } else {
      updatedCard.currentDelay = intervals[currentDelayIndex - 1];
    }

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

}
