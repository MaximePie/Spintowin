import React from 'react';

export default function Card({data, onAnswer}) {
  const {question, answer, currentDelay} = data;
  const [isAnswerShown, setAnswerDisplayState] = React.useState(false);

  return (
    <div className="Card" onClick={revealAnswer}>
      <p className="Card__delay">🎯{currentDelay}</p>
      <p>{isAnswerShown ? answer : question}</p>
      {isAnswerShown && (
        <div>
          <button onClick={(event) => onAnswer(event, true)}>OK</button>
          <button className="Card__action--failed" onClick={(event) => onAnswer(event, false)}>Pas OK</button>
        </div>
      )}
    </div>
  );

  function revealAnswer() {
    if (!isAnswerShown) {
      setAnswerDisplayState(true);
    }
  }
}
