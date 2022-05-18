import React, { useEffect, useState } from 'react';
import { getFromServer } from '../../services/server';
import CardType from '../../types/Card';

export default function DeleteCardsPage() {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(fetchCards, []);
  return (
    <div className="DeleteCardsPage" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {cards.map((card, index: number) => (
        <div
          tabIndex={index}
          role="button"
          style={{
            margin: '1em',
            border: 'solid',
            cursor: 'pointer',
            padding: '1em',
          }}
          onClick={() => deleteCard(card._id)}
          onKeyUp={(event) => event.key === 'enter' && deleteCard(card._id)}
        >
          <p>{card.question}</p>
          <p style={{ fontWeight: 'bold' }}>{card.answer}</p>
        </div>
      ))}
    </div>
  );

  function fetchCards() {
    getFromServer('cards/all').then(({ data }) => setCards(data));
  }

  function deleteCard(cardId: CardType['_id']) {
    getFromServer(`cards/delete/${cardId}`).then(fetchCards);
  }
}
