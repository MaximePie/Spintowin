import React, { useContext, useState } from 'react';
import { Store } from 'react-notifications-component';
import { faBolt, faBullseye } from '@fortawesome/free-solid-svg-icons';

import { memorisedNotification, streakNotification } from '../../../services/notification';
import { viewportContext } from '../../../contexts/viewport';
import CardType from '../../../types/Card';
import { UserContext } from '../../../contexts/user';
import { PoppingScoreContext } from '../../../contexts/poppingScore';
import { CardsProps } from './types';
import CardsDisplay from './CardsDisplay';

Cards.defaultProps = {
  remainingCards: 0,
  isLoading: false,
};

export default function Cards({
  cardsList, onCardUpdate, remainingCards, fetchCards, isLoading,
}: CardsProps) {
  const { shouldScoreBePoppedOut, displayPopupWithScore } = useContext(PoppingScoreContext);
  const { user: { hasStreakNotifications } } = useContext(UserContext);
  const [isScoreDisplayed, setScoreDisplayState] = useState(false);

  /**
   * In flashmode State, the user can validate a card by left-clicking or touching the card.
   */
  const [isFlashmode, setFlashmodeDisplay] = useState(false);
  const { isMobile } = React.useContext(viewportContext);

  const formattedCards = formattedCardsList();

  return (
    <CardsDisplay
      fetchCards={fetchCards}
      cardsList={formattedCards}
      remainingCards={remainingCards}
      isLoading={isLoading}
      onScoreChange={onScoreCheck}
      onFlashmodeChange={onFlashModeChange}
      isScoreDisplayed={isScoreDisplayed}
      scoreModeIcon={faBullseye}
      flashModeIcon={faBolt}
      isFlashMode={isFlashmode}
      shouldScoreBePoppedOut={shouldScoreBePoppedOut}
      handleAnswer={handleAnswer}
    />
  );

  /**
   * Update the score display on each card.
   * @param isChecked - true if the score should be displayed
   */
  function onScoreCheck(isChecked: boolean) {
    setScoreDisplayState(isChecked);
  }

  /**
   * Set the flashmode state to 'on' or 'off'
   * @param isChecked - true if the flashmode should be displayed
   */
  function onFlashModeChange(isChecked: boolean) {
    setFlashmodeDisplay(isChecked);
  }

  /**
   * Limit the total amount of displayed images simultaneously, because this is too hard to display
   */
  function formattedCardsList() {
    if (cardsList.length) {
      let displayedImages = 0;
      const maxDisplayedImages = 3;

      return cardsList.filter((card) => {
        if ((card.image && displayedImages === maxDisplayedImages)) {
          return false;
        }
        if (card.image) {
          displayedImages += 1;
        }
        return true;
      });
    }
    return [];
  }

  /**
   * If the answer is wrong, we go back to the previous interval, so it appears earlier
   * If the answer is right, we increment the interval, so it appears later
   * @param cardId
   * @param isSuccess
   */
  function handleAnswer(cardId: CardType['_id'], isSuccess: boolean) {
    // Get data
    const targetCard = cardsList.find((card) => card._id === cardId);
    if (targetCard) {
      if (targetCard.isMemorized) {
        Store.addNotification({
          ...memorisedNotification,
          message: `Vous avez mémorisé la carte ${targetCard.answer} ! Félicitations !`,
          container: isMobile ? 'bottom-center' : 'top-right',
        });
      }

      if (isSuccess) {
        // Get coordinates of the card
        const cardElement = document.getElementById(`card-${cardId}`);
        let coordinates;

        if (cardElement) {
          const { x, y } = cardElement.getBoundingClientRect();
          coordinates = { x, y };
        }
        displayPopupWithScore(targetCard.currentDelay, coordinates);
      }

      // TODO - Disable this line if you want the streak effect back.
      tryToDisplayStreakNotification(targetCard.currentSuccessfulAnswerStreak);

      onCardUpdate(targetCard, isSuccess);
    }
  }

  /**
   * If the parameter >= 3,
   * Display the current successful answer streak notification
   * Else, do nothing
   *
   * If the user's preference is set to hasStreakNotifications = false
   *  Do not display anything.
   *
   * @param currentSuccessfulAnswerStreak Number, the current amount of successful answers
   * the user gave.
   */
  function tryToDisplayStreakNotification(currentSuccessfulAnswerStreak: number) {
    if (hasStreakNotifications) {
      const shouldDisplayStreakNotification = currentSuccessfulAnswerStreak >= 3;
      if (shouldDisplayStreakNotification) {
        Store.addNotification({
          ...streakNotification,
          message: `${currentSuccessfulAnswerStreak} à la suite !`,
          container: isMobile ? 'bottom-center' : 'top-right',
        });
      }
    }
  }
}
