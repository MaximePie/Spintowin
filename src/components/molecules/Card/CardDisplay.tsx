import { CSSTransition } from 'react-transition-group';
import React from 'react';
import ReactTooltip from 'react-tooltip';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import QuestionEditionModal from '../QuestionEditionModal/QuestionEditionModal';
import { CardDisplayProps, FlipState } from './types';
import {
  StyledCard, Delay, Image, Content, Edit, StyledButton, Container, Category, Hint,
} from './styles';

export default function CardDisplay(props: CardDisplayProps) {
  const {
    isScoreDisplayed,
    isSingle,
    hasCategoriesDisplayed,
    isInverted,
    isAnswerShown,
    onAnswer,

    onClick,
    onRightClick,
    onKeypress,
    isModalOpen,
    onModalClose,
    onModalOpen,
    data,
    image,
    mode,
    hints,
  } = props;

  const {
    question,
    answer,
    currentDelay,
    isOwnerOfCard,
    category,
    _id,
  } = data;

  const cardFlipState: FlipState = (!isAnswerShown) ? 'recto' : 'verso';
  const content = cardContent();

  return (
    <Container id={`card-${_id}`}>
      {isModalOpen && (
        <QuestionEditionModal
          card={data}
          onClose={onModalClose}
          isOwnerOfCard={isOwnerOfCard}
        />
      )}

      {cardFlipState === 'recto' && (
        <StyledCard
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyUp={onKeypress}
          isSingle={isSingle}
          noBorders={!!image && !isSingle}
          onContextMenu={onRightClick}
        >
          <div>
            {hints.length > 0 && (
              <Hint>
                <ReactTooltip id={`main-${_id}`} place="top" type="dark" effect="solid" multiline />
                <span
                  className="AddCardForm__hint"
                  data-for={`main-${_id}`}
                  data-tip={hints.join('|')}
                  data-iscapture="true"
                >
                  <i className="far fa-question-circle" />
                </span>
              </Hint>
            )}
            {hasCategoriesDisplayed && category && (
              <Category>
                {category}
              </Category>
            )}
            {isScoreDisplayed && (
              <Delay>
                🎯
                {currentDelay}
              </Delay>
            )}
            <Content>{content}</Content>
            {image && (
              <Image
                isSingle={isSingle}
                src={image}
                alt=""
              />
            )}
          </div>
        </StyledCard>
      )}
      <CSSTransition
        in={isAnswerShown}
        classNames="Card--answerShown"
        unmountOnExit
        timeout={0}
      >
        <StyledCard
          isSingle={isSingle}
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyUp={onKeypress}
        >
          <Edit
            icon={faEdit}
            onClick={onModalOpen}
            role="button"
            tabIndex={0}
          />
          {hasCategoriesDisplayed && category && (
            <Category>
              {category}
            </Category>
          )}
          <Content>{content}</Content>
          <div>
            {mode !== 'quest' && (
              <StyledButton
                onClick={() => onAnswer(true)}
                type="button"
                text="Ok"
              />
            )}
            <StyledButton
              onClick={() => onAnswer(false)}
              type="button"
              text="Pas OK"
              variant="danger"
              isFailed
            />
          </div>
        </StyledCard>
      </CSSTransition>
    </Container>
  );

  /**
   * Return the text displayed in the card
   */
  function cardContent(): string {
    if (cardFlipState === 'recto') {
      if (question && !isInverted) {
        return question;
      }
      if (answer && isInverted) {
        return answer;
      }
      return '';
    }
    return isInverted ? (question || '') : answer;
  }
}
