import React, {useEffect, useState} from 'react';
import {CSSTransition} from 'react-transition-group';

export default function Card({data, onAnswer}) {
  const {question, answer, currentDelay, image} = data;
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
          {question && (
            <p>{question}</p>
          )}
          {image && (
            <img className="Card__image" src={formatedImage(image.data)} alt=""/>
          )}
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
        onExited={() => {onAnswer(isAnswerSuccessful)}}
      >
        <div className="Card" onClick={revealAnswer}>
          <p className="Card__delay">🎯{currentDelay}</p>
          <>
            <p>{answer}</p>
            <div>
              <button
                onMouseEnter={() => setAnswerSuccessState(true)}
                onClick={() => setAnswerSuccessState(true)}
              >
                OK
              </button>
              <button
                className="Card__action--failed"
                onMouseEnter={() => setAnswerSuccessState(false)}
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
