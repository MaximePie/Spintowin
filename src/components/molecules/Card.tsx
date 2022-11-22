import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import QuestionEditionModal from './QuestionEditionModal';
import UserCardType from '../../types/UserCard';
import ImageType from '../../types/ImageType';

type CardProps = {
  data: UserCardType,
  onAnswer: Function,
  isScoreDisplayed?: boolean,
  shouldCardsBeInverted?: boolean,
  onUpdate: Function,
  isSingle?: boolean,
}
const Card = function Card({
  data,
  onAnswer,
  isScoreDisplayed,
  shouldCardsBeInverted,
  onUpdate,
  isSingle,
}: CardProps) {
  const {
    question,
    answer,
    currentDelay,
    image,
    isOwnerOfCard,
    category,
  } = data;
  const [isAnswerShown, setAnswerDisplayState] = useState(false);
  const [isAnswerSuccessful, setAnswerSuccessState] = useState<boolean | undefined>(undefined);
  const [isModalOpen, setOpenModalState] = useState(false);
  const isAnswerShownRef = React.useRef(false);

  useEffect(() => {
    if (isAnswerSuccessful === true || isAnswerSuccessful === false) {
      setAnswerDisplayState(false);
      onAnswer(isAnswerSuccessful);
    }
  }, [isAnswerSuccessful]);

  useEffect(setKeyBinds, []);

  return (
    <>
      {isModalOpen && (
        <QuestionEditionModal
          card={data}
          onClose={handleQuestionEditionModalClose}
          isOwnerOfCard={isOwnerOfCard}
        />
      )}

      {!isAnswerShown && isAnswerSuccessful === undefined && (
        <div
          className={`Card ${isSingle && 'Card--isSingle'}`}
          onClick={revealAnswer}
          role="button"
          tabIndex={0}
          onKeyUp={(event) => event.key === 'enter' && revealAnswer()}
        >
          <div>
            {category && (
              <p>
                {category}
              </p>
            )}
            {isScoreDisplayed && (
              <p className="Card__delay">
                🎯
                {currentDelay}
              </p>
            )}
            {question && !shouldCardsBeInverted && (
              <p className="Card__answer">{question}</p>
            )}
            {answer && shouldCardsBeInverted && (
              <p className="Card__answer">{answer}</p>
            )}
            {image && (
              <img className="Card__image" src={image} alt="" />
            )}
          </div>
        </div>
      )}
      <CSSTransition
        in={isAnswerShown}
        classNames="Card--answerShown"
        unmountOnExit
        timeout={0}
      >
        <div
          className={`Card ${isSingle && 'Card--isSingle'}`}
          onClick={revealAnswer}
          role="button"
          tabIndex={0}
          onKeyUp={(event) => event.key === 'enter' && revealAnswer}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <i
            className="fas fa-edit Card__edit"
            onClick={() => setOpenModalState(true)}
            onKeyUp={(event) => event.key === 'enter' && setOpenModalState(true)}
            role="button"
            tabIndex={0}
          />
          {category && (
            <p>
              {category}
            </p>
          )}
          {isScoreDisplayed && (
            <p className="Card__delay">
              🎯
              {currentDelay}
            </p>
          )}
          {!shouldCardsBeInverted && (
          <p className="Card__answer">{answer}</p>
          )}
          {shouldCardsBeInverted && (
          <p className="Card__answer">{question}</p>
          )}
          <div>
            <button
              onClick={() => setAnswerSuccessState(true)}
              type="button"
            >
              OK
            </button>
            <button
              className="Card__action--failed"
              onClick={() => setAnswerSuccessState(false)}
              type="button"
            >
              Pas OK
            </button>
          </div>
        </div>
      </CSSTransition>
    </>
  );

  /**
   * Closes the modal, and updates the current collection
   */
  function handleQuestionEditionModalClose() {
    setOpenModalState(false);
    onUpdate();
  }

  function formatedImage(imageData: ImageType) {
    const base64Flag = `data:${imageData.contentType};base64,`;
    const imageString = arrayBufferToBase64(imageData.data.data);
    return base64Flag + imageString;
  }

  /**
   * Returns the converted image
   * This function is not from me !
   * https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
   * https://colinrlly.medium.com/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
   * @param buffer
   */
  function arrayBufferToBase64(buffer: Iterable<number>) {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return window.btoa(binary);
  }

  function revealAnswer() {
    if (!isAnswerShown) {
      setAnswerDisplayState(true);
      isAnswerShownRef.current = true;
    }
  }

  function setKeyBinds() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'NumpadEnter':
          revealAnswer();
          break;
        case 'Numpad1':
          setAnswerSuccessState(true);
          break;
        case 'Numpad3':
          setAnswerSuccessState(false);
          break;
        default:
          break;
      }
    });
  }
};

Card.defaultProps = {
  isScoreDisplayed: false,
  shouldCardsBeInverted: false,
  isSingle: false,
};
export default Card;
