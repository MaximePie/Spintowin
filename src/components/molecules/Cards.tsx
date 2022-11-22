import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import Card from './Card/Card';

import { memorisedNotification, streakNotification } from '../../services/notification';
import { viewportContext } from '../../contexts/viewport';
import LoadingGif from '../atoms/LoadingGif';

import { generateUpdatedCard } from '../../services/card';
import UserCard from '../../types/UserCard';
import CardType from '../../types/Card';
import { UserContext } from '../../contexts/user';
import { PoppingScoreContext } from '../../contexts/poppingScore';
import PoppingScore from '../atoms/PoppingScore/PoppingScore';

type CardsProps = {
  cardsList: UserCard[],
  triggerCardUpdate: Function,
  fetchCards: Function,
  remainingCards?: number,
  isLoading?: boolean,
};

Cards.defaultProps = {
  remainingCards: 0,
  isLoading: false,
};

export default function Cards({
  cardsList, triggerCardUpdate, remainingCards, fetchCards, isLoading,
}: CardsProps) {
  const { shouldScoreBePoppedOut, displayPopupWithScore } = useContext(PoppingScoreContext);
  const { user: { hasStreakNotifications }, intervals } = useContext(UserContext);
  const [isScoreDisplayed, setScoreDisplayState] = useState(false);

  /**
   * In flashmode State, the user can validate a card by left-clicking or touching the card.
   */
  const [isFlashmode, setFlashmodeDisplay] = useState(false);
  const { isMobile } = React.useContext(viewportContext);

  const formattedCards = formattedCardsList();

  const cardsClassname = isFlashmode ? 'Cards Cards--flashmode' : 'Cards';

  return (
    <div className={cardsClassname}>
      <div className="Card Card--static">
        {(shouldScoreBePoppedOut) && (
          <PoppingScore />
        )}
        <p className="Card__answer">
          {remainingCards}
          {' '}
          cartes
        </p>
        <LoadingGif isLoading={isLoading || false} className="Cards__loading" />
        <div>
          <label className="Card--static__label">
            <input
              type="checkbox"
              onChange={(event) => setScoreDisplayState(event.target.checked)}
              checked={isScoreDisplayed}
            />
            Afficher le score
          </label>
        </div>
        <div>
          <label className="Card--static__label">
            <input
              type="checkbox"
              onChange={onFlashModeChange}
              checked={isFlashmode}
            />
            Mode Flash
          </label>
        </div>
      </div>
      {!isLoading && !cardsList.length && (
        <p>
          Pas de cartes pour le moment,
          <Link to="add">créez-en quelques unes</Link>
          {' '}
          !
        </p>
      )}
      {formattedCards.map((card) => (
        <Card
          data={card}
          key={card._id.toString()}
          onAnswer={(isSuccess: boolean) => handleAnswer(card._id, isSuccess)}
          isScoreDisplayed={isScoreDisplayed}
          isFlashmode={isFlashmode}
          onUpdate={fetchCards}
        />
      ))}
    </div>
  );

  /**
   * Set the flashmode state to 'on' or 'off'
   * @param event
   */
  function onFlashModeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFlashmodeDisplay(event.target.checked);
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
   * If the answer is wrong, we go back to the previous interval so it appears earlier
   * If the answer is right, we increment the interval so it appears later
   * @param cardId
   * @param isSuccess
   */
  function handleAnswer(cardId: CardType['_id'], isSuccess: boolean) {
    // Get data
    const targetCard = cardsList.find((card) => card._id === cardId);
    if (targetCard) {
      const updatedCard = generateUpdatedCard(targetCard!, isSuccess, intervals);

      if (updatedCard.isMemorized) {
        Store.addNotification({
          ...memorisedNotification,
          message: `Vous avez mémorisé la carte ${updatedCard.answer} ! Félicitations !`,
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
          console.log(coordinates);
        }
        displayPopupWithScore(targetCard.currentDelay, coordinates);
      }

      // TODO - Disable this line if you want the streak effect back.
      tryToDisplayStreakNotification(updatedCard.currentSuccessfulAnswerStreak);

      triggerCardUpdate(updatedCard);
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
