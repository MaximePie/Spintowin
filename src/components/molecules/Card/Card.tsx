import React, {KeyboardEvent, useEffect, useState} from 'react';
import {UserContext} from "../../../contexts/user";
import { CardProps } from './types';
import CardDisplay from "./CardDisplay";

const Card = function Card({
  data,
  onAnswer,
  isScoreDisplayed,
  isInverted,
  onUpdate,
  isSingle,
}: CardProps) {
  const {
    image,
  } = data;
  const [isAnswerShown, setAnswerDisplayState] = useState(false);
  const [isAnswerSuccessful, setAnswerSuccessState] = useState<boolean | undefined>(undefined);
  const [isModalOpen, setOpenModalState] = useState(false);
  const isAnswerShownRef = React.useRef(false);

  const {user: {hasCategoriesDisplayed}} = React.useContext(UserContext);

  useEffect(() => {
    if (isAnswerSuccessful === true || isAnswerSuccessful === false) {
      setAnswerDisplayState(false);
      onAnswer(isAnswerSuccessful);
    }
  }, [isAnswerSuccessful]);

  useEffect(setKeyBinds, []);

  return (
    <CardDisplay
      hasCategoriesDisplayed={hasCategoriesDisplayed}
      key={data._id.toString()}
      image={image}
      data={data}
      onAnswer={handleAnswer}
      isAnswerShown={isAnswerShown}
      isModalOpen={isModalOpen}
      isScoreDisplayed={isScoreDisplayed}
      isInverted={isInverted}
      isSingle={isSingle}
      onKeypress={(event) => reveal(event)}
      onClick={() => reveal()}
      onModalClose={closeModal}
      onModalOpen={openModal}
      onRightClick={handleRightClick}
    />
  );

  function handleRightClick(event: React.MouseEvent) {
    if (!isSingle) {
      event.preventDefault();
      handleAnswer(true);
    }
  }

  function reveal(event: KeyboardEvent<HTMLDivElement> | null = null) {
    if ((event?.code === 'enter' || !event) && !isAnswerShown) {
      setAnswerDisplayState(true);
      isAnswerShownRef.current = true;
    }
  }

  function handleAnswer(isAnswerSuccessful: boolean) {
    setAnswerSuccessState(isAnswerSuccessful);
  }

  /**
   * Open the question edition modal
   */
  function openModal() {
    setOpenModalState(true);
  }


  /**
   * Closes the modal, and updates the current collection
   */
  function closeModal() {
    setOpenModalState(false);
    onUpdate();
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
