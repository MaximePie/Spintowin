import React, {useEffect, useRef, useState} from 'react';
import {intervals,} from "../data/cards"
import Card from "./Card";

import axios from "axios";
import {getFromServer, postOnServer} from "../server";
import {Link} from "react-router-dom";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/cards`;

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


export default function Cards({onProgressUpdate}) {

  const [cardsList, setCardsList] = useState([]);
  const [isLoading, setLoadingState] = useState(false);
  const previousLength = usePrevious(cardsList.length);

  useEffect(() => {
    if (previousLength > cardsList.length || previousLength === undefined) {
      fetchCards()
    }
  }, [cardsList]);

  return (
    <div className="Cards">
      {!cardsList.length && <p>Pas de cartes pour le moment, <Link to="add">créez-en quelques unes</Link> !</p>}
      {cardsList.map(card =>
        <Card
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
    const currentDelayIndex = intervals.indexOf(updatedCard.currentDelay);

    // Edit data
    if (!updatedCard.currentDelay) {
      updatedCard.currentDelay = intervals[1];
    }
    else if (isSuccess && currentDelayIndex !== 0) {
      updatedCard.currentDelay = intervals[currentDelayIndex + 1];
    } else {
      updatedCard.currentDelay = intervals[currentDelayIndex - 1];
    }

    triggerCardUpdate(updatedCard);
  }


  function fetchCards() {
    setLoadingState(true);
    getFromServer('/cards/').then(({data}) => {
      if (data.cards) {
        setCardsList(data.cards);
      } else {
        setCardsList([]);
      }
      setLoadingState(false);
    })
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card) {
    postOnServer(`/cards/${card._id}`, {newDelay: card.currentDelay || intervals[1]}).then(fetchCards);
  }
}
