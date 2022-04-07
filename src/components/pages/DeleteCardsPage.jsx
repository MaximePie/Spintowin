
import React, {useEffect, useState} from 'react';
import {getFromServer} from "../../services/server";

export default function DeleteCardsPage() {
  const [cards, setCards] = useState([]);

  useEffect(fetchCards, []);
    return (
        <div className="DeleteCardsPage" style={{display: "flex", flexWrap: "wrap"}}>
          {cards.map(card => <div style={{
            margin: "1em",
            border: "solid",
            cursor: "pointer",
            padding: "1em",
          }} onClick={() => deleteCard(card._id)}>
            <p>{card.question}</p>
            <p style={{fontWeight: "bold"}}>{card.answer}</p>
          </div>)}
        </div>
    );

    function fetchCards() {
      getFromServer("cards/all").then(({data}) => setCards(data))
    }

    function deleteCard(cardId) {
      getFromServer("cards/delete/"+ cardId).then(response => {
        console.log(response);
        fetchCards();
      })
    }
}
