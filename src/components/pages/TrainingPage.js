import React, {useEffect, useRef, useState} from 'react';
import Cards from "../molecules/Cards";
import {getFromServer, postOnServer} from "../../server";
import {intervals} from "../../data/cards";

/**
 * This custom hooks returns the previous value of the ref.
 * It has an effect in hit which allows the previous value to update.
 * @param value
 */
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });
  const previousValue = ref.current;
  return previousValue;
}


export default function TrainingPage() {
  const [cardsList, setCardsList] = useState([]);
  const [remainingCards, setRemainingCards] = useState(0);
  const [isLoading, setLoadingState] = useState(false);
  const previousLength = usePrevious(cardsList.length);

  useEffect(() => {
    if (previousLength === undefined) {
      fetchCards()
    }
  }, [cardsList, previousLength]);

  return (
    <div className="TrainingPage">
      <Cards
        cardsList={cardsList}
        triggerCardUpdate={triggerCardUpdate}
        remainingCards={remainingCards}
        fetchCards={fetchCards}
        isLoading={isLoading}
      />
    </div>
  );


  function fetchCards() {
    setLoadingState(true);
    getFromServer('/userCards').then(({data}) => {
      setLoadingState(false);
      if (data.cards) {
        setCardsList([...data.cards]);
        setRemainingCards(data.remainingCards)
      } else {
        setCardsList([]);
      }
    })
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card) {
    postOnServer(`/userCards/update/${card.cardId}`,
      {newDelay: card.currentDelay || intervals[1], isMemorized: card.isMemorized})
      .then(fetchCards);
  }
}
