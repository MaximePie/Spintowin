import React, {useEffect, useRef, useState} from 'react';
import {getFromServer, postOnServer} from '../../../services/server';
import intervals from '../../../data/cards';
import UserCard from '../../../types/UserCard';
import TrainingDisplay from "./TrainingDisplay";
import {useQuery, useQueryClient} from "react-query";
import {TrainingCardsQuery} from "./types";
import {useIsMounted} from "react-query/types/devtools/utils";

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

export default function Training() {
  const queryClient = useQueryClient()
  const {data, isLoading, error} = useQuery<TrainingCardsQuery>('cards', fetchCards)
  const [cards, setCards] = useState<UserCard[]>([]);
  const [remainingCards, setRemainingCards] = useState<number>(0);

  let isMounted = true;

  useEffect(() => {
    if (isMounted && data) {
      setCards(data.cards)
      setRemainingCards(data.remainingCards)
    }
    return () => {
      isMounted = false;
    };
  }, [data]);



  return data ? (
      <TrainingDisplay
        cards={cards}
        triggerCardUpdate={triggerCardUpdate}
        remainingCards={remainingCards}
        fetchCards={fetchCards}
        isLoading={isLoading}
        key='Training Display'
      />
    )
    : <p>error</p>;

  function fetchCards() {
    return getFromServer('/userCards').then(({data}) => data);
  }

  /**
   * Invalidate the query
   */
  function refetch() {
    queryClient.invalidateQueries('cards');
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
      {newDelay: currentDelay || intervals[1], isMemorized},
    ).then(refetch);
  }
}
