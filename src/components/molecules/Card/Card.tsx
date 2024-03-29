import React, { KeyboardEvent, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/user';
import { CardProps } from './types';
import CardDisplay from './CardDisplay';
import { QuestContext } from '../../../contexts/quest';

const Card = function Card(props: CardProps) {
  const {
    data,
    onAnswer,
    isScoreDisplayed,
    onUpdate,
    isSingle,
    mode,
    isFlashmode,
    className,
  } = props;

  const {
    image,
  } = data;
  const [isAnswerShown, setAnswerDisplayState] = useState(false);
  const [isAnswerSuccessful, setAnswerSuccessState] = useState<boolean | undefined>(undefined);
  const [isModalOpen, setOpenModalState] = useState(false);
  const isAnswerShownRef = React.useRef(false);

  const { user: { hasCategoriesDisplayed } } = React.useContext(UserContext);
  const { ignore: ignoreCard } = React.useContext(QuestContext);
  const hints = data.hints || [];

  useEffect(() => {
    if (isAnswerSuccessful === true || isAnswerSuccessful === false) {
      setAnswerDisplayState(false);
      onAnswer(isAnswerSuccessful);
    }
  }, [isAnswerSuccessful]);

  useEffect(afterReveal, [isAnswerShown]);

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
      isSingle={isSingle}
      mode={mode}
      onKeypress={(event) => reveal(event)}
      onClick={() => onCardClick()}
      onModalClose={closeModal}
      onModalOpen={openModal}
      onRightClick={handleRightClick}
      hints={hints}
      className={className}
    />
  );

  /**
   * If isFlashmode, handleAnswer with true
   * else trigger onReveal
   */
  function onCardClick() {
    if (isFlashmode) {
      handleAnswer(true);
    } else {
      reveal();
    }
  }

  /**
   * Remove the cards from potentially valid answers
   * Only for Quest mode
   */
  function afterReveal() {
    if (isAnswerShown) {
      ignoreCard(data.cardId);
    }
  }

  /**
   * Try to successfully answer, but only for other than quest mode
   * @param event
   */
  function handleRightClick(event: React.MouseEvent) {
    if (!isSingle && mode !== 'quest') {
      event.preventDefault();
      handleAnswer(true);
    }
  }

  /**
   * Display the answer
   * @param event
   */
  function reveal(event: KeyboardEvent<HTMLDivElement> | null = null) {
    if ((event?.code === 'enter' || !event) && !isAnswerShown) {
      setAnswerDisplayState(true);
      isAnswerShownRef.current = true;
    }
  }

  /**
   * Handle the answer of the user
   * @param isSuccessful - true if the answer is correct, false otherwise
   */
  function handleAnswer(isSuccessful: boolean) {
    setAnswerSuccessState(isSuccessful);
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

  /**
   * Add shortcuts to automatically valide or invalidate cards
   * Mode !== quest only !
   */
  function setKeyBinds() {
    function eventHandler(event: globalThis.KeyboardEvent) {
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
    }
    if (mode !== 'quest') {
      document.addEventListener('keydown', eventHandler);
    }

    if (mode === 'quest') {
      document.removeEventListener('keydown', eventHandler);
    }
  }
};

Card.defaultProps = {
  isScoreDisplayed: false,
  isFlashmode: false,
  isSingle: false,
};
export default Card;
