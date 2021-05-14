import React from 'react';
import axios from "axios";

export default function AddCard() {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  return (
    <div className="AddCard">
      <h3>Ajouter une question</h3>
      <div className="AddCard__fields">
        <label>
          Question
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)}/>
        </label>
        <label htmlFor="">
          Réponse
          <input type="text" value={answer} onChange={(event) => setAnswer(event.target.value)}/>
        </label>
      </div>
      <div className="AddCard__actions">
        <button
          onClick={saveQuestion}
          className="AddCard__submit">
          Envoyer
        </button>
      </div>
    </div>
  );

  function saveQuestion() {
    axios.post(
      'http://127.0.0.1:4001/cards',
      {
        question,
        answer,
      }
    ).then(() => {
      setQuestion('');
      setAnswer('');
    })
  }
}
