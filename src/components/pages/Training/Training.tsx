import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getFromServer, postOnServer } from '../../../services/server';
import intervals from '../../../data/cards';
import UserCard from '../../../types/UserCard';
import TrainingDisplay from './TrainingDisplay';
import { TrainingCardsQuery } from './types';

export default function Training() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<TrainingCardsQuery>('cards', fetchCards);
  const [cards, setCards] = useState<UserCard[]>([]);
  const [remainingCards, setRemainingCards] = useState<number>(0);

  let isMounted = true;

  useEffect(() => {
    if (isMounted && data) {
      setCards(data.cards);
      setRemainingCards(data.remainingCards);
    }
    return () => {
      isMounted = false;
    };
  }, [data]);

  if (isLoading) {
    return <p>Chargement ...</p>;
  }

  return data ? (
    <TrainingDisplay
      cards={cards}
      onCardUpdate={onCardUpdate}
      remainingCards={remainingCards}
      fetchCards={() => fetchCards(null)}
      isLoading={isLoading}
      key="Training Display"
    />
  )
    : <p>error</p>;

  function refetch(updatedCards: typeof cards) {
    queryClient.setQueryData('cards', {
      cards: updatedCards,
      remainingCards,
    });
    queryClient.cancelQueries('cards').then(() => {
      queryClient.invalidateQueries('cards').then(null);
    });
  }

  function fetchCards(options: any = {}) {
    return getFromServer('/userCards', options?.signal).then(({ data: fetchedCards }) => fetchedCards);
  }

  /**
   * After the card has been updated, we need to update the remaining cards
   * and the cards list
   * @param card The updated card
   * @param isSuccessful
   */
  function onCardUpdate(card: UserCard, isSuccessful: boolean) {
    const updatedCards = cleanUpdatedCard(card);
    triggerCardUpdate(card, updatedCards, isSuccessful);
  }

  /**
   * Remove the updated card from the cards list and update the remaining cards
   * @param updatedCard The updated card to remove from the cards list
   */
  function cleanUpdatedCard(updatedCard: UserCard) : UserCard[] {
    const { _id } = updatedCard;
    const updatedCards = [...cards.filter((stateCard) => stateCard._id !== _id)];
    setCards(updatedCards);

    return updatedCards;
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card The card to update
   * @param updatedCards The updated cards list
   * @param isSuccessful
   */
  function triggerCardUpdate(card: UserCard, updatedCards: UserCard[], isSuccessful: boolean) {
    const { isMemorized } = card;

    postOnServer(
      `/userCards/update/${card._id}`,
      { isMemorized, isSuccessful },
    ).then(() => refetch(updatedCards));
  }
}
