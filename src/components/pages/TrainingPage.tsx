import React, { useEffect, useRef, useState } from 'react';
import Cards from '../molecules/Cards';
import { getFromServer, postOnServer } from '../../services/server';
import intervals from '../../data/cards';
import UserCard from '../../types/UserCard';

/**
 * This custom hooks returns the previous value of the ref.
 * It has an effect in hit which allows the previous value to update.
 * @param value
 */
function usePrevious(value: number) {
  const ref = useRef<number>();

  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function TrainingPage() {
  const [cards, setCards] = useState<UserCard[]>([]);
  const [remainingCards, setRemainingCards] = useState(0);
  const [isLoading, setLoadingState] = useState(false);
  const previousLength = usePrevious(cards.length);

  useEffect(() => {
    if (previousLength === undefined) {
      fetchCards();
    }
  }, [cards, previousLength]);

  return (
    <div className="TrainingPage">
      <Cards
        cardsList={cards}
        triggerCardUpdate={triggerCardUpdate}
        remainingCards={remainingCards}
        fetchCards={fetchCards}
        isLoading={isLoading}
      />
    </div>
  );

  function fetchCards() {
    setLoadingState(true);
    getFromServer('/userCards').then(({ data }) => {
      setLoadingState(false);
      if (data.cards) {
        setCards([...data.cards]);
        setRemainingCards(data.remainingCards);
      } else {
        setCards([]);
      }
    });
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card: UserCard) {
    const {currentDelay, isMemorized, _id} = card;
    setCards([...cards.filter((stateCard) => stateCard._id !== _id)])
    postOnServer(
      `/userCards/update/${card.cardId}`,
      { newDelay: currentDelay || intervals[1], isMemorized },
    ).then(fetchCards);
  }
}
