import React, {useEffect, useRef, useState} from 'react';
import {intervals,} from "../data/cards"
import Card from "./Card";

import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/cards`;

console.log(baseUrl);

/**
 * This custom hooks returns the previous value of the ref.
 * It has an effect in hit which allows the previous value to update.
 * @param value
 */
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {ref.current = value;});
  const previousValue = ref.current;
  return previousValue;
}


export default function Cards({onProgressUpdate}) {

  const [cardsList, setCardsList] = useState([]);
  const previousLength = usePrevious(cardsList.length);

  useEffect(() => {
    if (previousLength > cardsList.length || previousLength === undefined) {
      fetchCards()
    }
  }, [cardsList]);

  console.log(process.env.REACT_APP_TEST);

  return (
    <div className="Cards">
      {cardsList.map(card => <Card
        data={card}
        key={card._id}
        onAnswer={(isSuccess) => handleAnswer(card._id, isSuccess)}
      />)}
    </div>
  );


  /**
   * If the answer is wrong, we go back to the first interval : 15 seconds
   * If the answer is right, we increment de interval so it appears later
   * @param cardId
   * @param isSuccess
   */
  function handleAnswer(cardId, isSuccess) {
    // Get data
    const targetCard = cardsList.find((card) => card._id === cardId);

    let updatedCard = {...targetCard};
    const updatedCurrentDelayIndex = intervals.indexOf(updatedCard.currentDelay) + 1;
    // Edit data
    if (isSuccess && updatedCurrentDelayIndex !== 0) {
      updatedCard.currentDelay = intervals[updatedCurrentDelayIndex];
    } else {
      updatedCard.currentDelay = intervals[1];
    }

    triggerCardUpdate(updatedCard);

    // const updatedCardsList = [...cardsList].filter(card => card._id !== cardId);
    // setCardsList(updatedCardsList);
  }


  function fetchCards() {
    axios.get(baseUrl).then(({data}) => {
      setCardsList(data.cards);
    })
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card) {
    axios.post(`${baseUrl}/${card._id}`, {newDelay: card.currentDelay}).then(fetchCards);
  }
}
