import React, {useEffect, useState} from 'react';
import "../Card.css";
import {CSSTransition} from 'react-transition-group';

export default function Card({data, onAnswer}) {
  const {question, answer, currentDelay} = data;
  const [isAnswerShown, setAnswerDisplayState] = useState(false);
  const [isAnswerSuccessful, setAnswerSuccessState] = useState(undefined);

  useEffect(() => {
    if (isAnswerSuccessful === true || isAnswerSuccessful === false) {
      setAnswerDisplayState(false);
    }
  }, [isAnswerSuccessful]);

  return (
    <>
      {!isAnswerShown && isAnswerSuccessful === undefined && (
        <div className="Card" onClick={revealAnswer}>
          <p className="Card__delay">🎯{currentDelay}</p>
          <p>{question}</p>
        </div>
      )}
      <CSSTransition
        in={isAnswerShown}
        timeout={{
          appear: 0,
          enter: 0,
          exit: 200,
        }}
        classNames="Card--answerShown"
        unmountOnExit
        onExited={() => {
          console.log("Exiting !");
          onAnswer(isAnswerSuccessful)
        }}
      >
        <div className="Card" onClick={revealAnswer}>
          <p className="Card__delay">🎯{currentDelay}</p>
          <>
            <p>{answer}</p>
            <div>
              <button onClick={() => setAnswerSuccessState(true)}>OK</button>
              <button className="Card__action--failed" onClick={() => setAnswerSuccessState(false)}>Pas OK</button>
            </div>
          </>
        </div>
      </CSSTransition>
    </>
  );

  function revealAnswer() {
    if (!isAnswerShown) {
      setAnswerDisplayState(true);
    }
  }
}
