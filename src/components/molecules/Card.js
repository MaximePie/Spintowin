import React, {useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';

export default function Card({data, onAnswer, isScoreDisplayed, shouldCardsBeInverted}) {
  const {question, answer, currentDelay, image} = data;
  const [isAnswerShown, setAnswerDisplayState] = useState(false);
  const [isAnswerSuccessful, setAnswerSuccessState] = useState(undefined);

  useEffect(() => {
    if (isAnswerSuccessful === true || isAnswerSuccessful === false) {
      setAnswerDisplayState(false);
      onAnswer(isAnswerSuccessful);
    }
  }, [isAnswerSuccessful]);

  return (
    <>
      {!isAnswerShown && isAnswerSuccessful === undefined && (
        <div className="Card" onClick={revealAnswer}>
          {isScoreDisplayed && (
            <p className="Card__delay">🎯{currentDelay}</p>
          )}
          {question && !shouldCardsBeInverted && (
            <p className="Card__answer">{question}</p>
          )}
          {answer && shouldCardsBeInverted && (
            <p className="Card__answer">{answer}</p>
          )}
          {image && (
            <img className="Card__image" src={formatedImage(image.data)} alt=""/>
          )}
        </div>
      )}
      <CSSTransition
        in={isAnswerShown}
        classNames="Card--answerShown"
        unmountOnExit
        timeout={0}
      >
        <div className="Card" onClick={revealAnswer}>
          {isScoreDisplayed && (
            <p className="Card__delay">🎯{currentDelay}</p>
          )}
          <>
            {!shouldCardsBeInverted && (
              <p className="Card__answer">{answer}</p>
            )}
            {shouldCardsBeInverted && (
              <p className="Card__answer">{question}</p>
            )}
            <div>
              <button
                onClick={() => setAnswerSuccessState(true)}
              >
                OK
              </button>
              <button
                className="Card__action--failed"
                onClick={() => setAnswerSuccessState(false)}
              >
                Pas OK
              </button>
            </div>
          </>
        </div>
      </CSSTransition>
    </>
  );

  function formatedImage(image) {
    const base64Flag = `data:${image.contentType};base64,`;
    const imageString = arrayBufferToBase64(image.data);
    return base64Flag + imageString;
  }

  /**
   * Returns the converted image
   * This function is not from me !
   * https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
   * https://colinrlly.medium.com/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
   * @param buffer
   */
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  function revealAnswer() {
    if (!isAnswerShown) {
      setAnswerDisplayState(true);
    }
  }
}
