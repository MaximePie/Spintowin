import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getFromServer, postOnServer } from '../../../services/server';
import UserCard from '../../../types/UserCard';
import TrainingDisplay from './TrainingDisplay';
import { TrainingCardsQuery } from './types';
import { UserContext } from '../../../contexts/user';

export default function Training() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<TrainingCardsQuery>('cards', fetchCards);
  const [cards, setCards] = useState<UserCard[]>([]);
  const [remainingCards, setRemainingCards] = useState<number>(0);

  const {
    incrementUserStreak, resetUserStreak, setUser,
  } = useContext(UserContext);

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
   * @param earnedCoins The number of coins earned by the user, sometimes it can
   * appear when answering
   */
  function onCardUpdate(card: UserCard, isSuccessful: boolean, earnedCoins: number = 0) {
    const updatedCards = cleanUpdatedCard(card);
    if (isSuccessful) {
      incrementUserStreak();
    } else {
      resetUserStreak();
    }
    triggerCardUpdate(card, updatedCards, isSuccessful, earnedCoins);
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
   * @param isSuccessful Whether the answer was successful or not
   * @param coins The number of coins to add to the user, sometimes it can appear when answering
   */
  function triggerCardUpdate(
    card: UserCard,
    updatedCards: UserCard[],
    isSuccessful: boolean,
    coins: number = 0,
  ) {
    const { isMemorized } = card;

    postOnServer(
      `/userCards/update/${card._id}`,
      { isMemorized, isSuccessful, coins },
    ).then((response) => {
      // Update user
      if (response.data.updatedUser) {
        setUser(response.data.updatedUser);
      }
      refetch(updatedCards);
    });
  }
}
