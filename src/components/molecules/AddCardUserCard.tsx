import React, { memo, useState } from 'react';
import AddCardUserCardDetails from './AddCardUserCardDetails';
import UserCardType from '../../types/UserCard';
import CardType from '../../types/Card';

type AddCardUserCardProps = {
  card: UserCardType,
  onAddCardToCart: Function,
}

function AddCardUserCard({ card, onAddCardToCart }: AddCardUserCardProps) {
  const [isDisabled, setDisableState] = useState(false);

  return (
    <div className="AddCardUserCard">
      {card && <AddCardUserCardDetails card={card} />}
      <div className="AddCardUserCard__actions">
        <button
          disabled={card.isAssignedToConnectedUser || isDisabled}
          onClick={() => absorbCard(card._id)}
          type="button"
        >
          <i className="fas fa-plus" />
          <span className="AddCardUserCard__button-text">
            Ajouter
          </span>
        </button>
      </div>
    </div>
  );

  /**
   * Add the card to the user's current collection
   * @param cardId The Id of the card we want to absorb
   */
  function absorbCard(cardId: CardType['_id']) {
    setDisableState(true);
    onAddCardToCart(cardId);
  }
}

export default memo(AddCardUserCard);
