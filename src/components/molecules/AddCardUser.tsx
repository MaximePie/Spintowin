import React, { useEffect, useState } from 'react';
import { ObjectId } from 'bson';
import { getFromServer, postOnServer } from '../../services/server';
import AddCardUserCard from './AddCardUserCard';
import { addNotification, CardSuccessNotification } from '../../services/notification';
import UserCardType from '../../types/UserCard';
import CardType from '../../types/Card';

type CardUserProps = {
  userId: ObjectId
}

export default function AddCardUser({ userId }: CardUserProps) {
  // The cards of the user
  const [cards, setCards] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  // An array of Ids representing the selected cards by the User
  const [cardsCart, setCardsCart] = useState<CardType['_id'][]>([]);

  // Trigger the fetch method at the beginning of the component lifeCycle,
  // and when the userId changes
  useEffect(fetchUserInfo, [userId]);

  return (
    <div className="AddCardUser">
      <button
        type="button"
        disabled={cardsCart.length === 0}
        className="AddCardUser__save-button"
        onClick={saveCart}
      >
        Sauvegarder (
        {cardsCart.length}
        )
      </button>
      {((isLoading && cards.length) || (!isLoading)) && (
        <div>
          {cards?.map((card: UserCardType) => (
            <AddCardUserCard
              key={card._id.toString()}
              card={card}
              onAddCardToCart={addCardToCart}
            />
          ))}
        </div>
      )}
    </div>
  );

  /**
   * Saves the selected Cards in the Cart
   */
  function saveCart() {
    setCardsCart([]);
    postOnServer('/userCards/absorbMany', { cardsIds: cardsCart }).then((response) => {
      if (response.status === 201) {
        // TODO - Afficher une notification de succès
        addNotification(CardSuccessNotification);
      } else {
        // TODO - Gérer l'erreur
      }
    });
  }

  /**
   * Adds the selected cart to the Cart List
   * @param cardId id de mongoDB
   */
  function addCardToCart(cardId: CardType['_id']) {
    setCardsCart([...cardsCart, cardId]);
  }

  // TODO - Se connecter feature

  /**
   * Fetches the info relative to the user
   */
  function fetchUserInfo() {
    setLoadingState(true);
    getFromServer(`/userCards/list/${userId}`).then(({ status, data }) => {
      setLoadingState(false);
      if (status === 200) {
        setCards(data.cards);
      } else {
        // TODO - Handle error
      }
    });
  }
}
