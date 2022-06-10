import React, {useContext, useEffect, useState} from 'react';
import {getFromServer, postOnServer} from '../../../services/server';
import intervals from '../../../data/cards';
import UserCard from '../../../types/UserCard';
import TrainingDisplay from "./TrainingDisplay";
import {useQuery, useQueryClient} from "react-query";
import {TrainingCardsQuery} from "./types";
import Button from "../../atoms/Button/Button";
import {PoppingScoreContext} from "../../../contexts/poppingScore";

export default function Training() {
  const {displayPopupWithScore} = useContext(PoppingScoreContext)
  const queryClient = useQueryClient();

  const {data, isLoading, isRefetching} = useQuery<TrainingCardsQuery>('cards', fetchCards)
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


  if (isLoading) {
    return <p>Chargement ...</p>
  }

  return data ? (
    <>
      <TrainingDisplay
        cards={cards}
        triggerCardUpdate={triggerCardUpdate}
        remainingCards={remainingCards}
        fetchCards={() => fetchCards(null)}
        isLoading={isLoading}
        key='Training Display'
      />
    </>
    )
    : <p>error</p>;

  function refetch(updatedCards: typeof cards) {
    console.log("Refetching ?" + isRefetching);
    queryClient.setQueryData('cards', {
      cards: updatedCards,
      remainingCards
    });
    queryClient.cancelQueries('cards').then(() => {
      queryClient.invalidateQueries('cards').then(null)
    });
  }

  function fetchCards({signal}: any) {
    return getFromServer('/userCards', signal).then(({data}) => data);
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card: UserCard) {
    const {currentDelay, isMemorized, _id} = card;
    const updatedCards = [...cards.filter((stateCard) => stateCard._id !== _id)];
    setCards(updatedCards)

    postOnServer(
      `/userCards/update/${card.cardId}`,
      {newDelay: currentDelay || intervals[1], isMemorized},
    ).then(() => refetch(updatedCards))
  }
}
