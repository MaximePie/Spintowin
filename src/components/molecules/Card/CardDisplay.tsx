import QuestionEditionModal from "../QuestionEditionModal/QuestionEditionModal";
import {CSSTransition} from "react-transition-group";
import React from "react";
import {CardDisplayProps, FlipState} from "./types"
import {StyledCard, Delay, Image, Content, Edit, StyledButton, Container} from "./styles";
import { faEdit } from '@fortawesome/free-solid-svg-icons'

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
  } = props;

  const {
    question,
    answer,
    currentDelay,
    isOwnerOfCard,
    category,
  } = data;

  const cardFlipState: FlipState = (!isAnswerShown) ? 'recto' : 'verso'
  const content = cardContent();

  return (
    <Container>
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
            {hasCategoriesDisplayed && category && (
              <p>
                {category}
              </p>
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
            <p>
              {category}
            </p>
          )}
          <Content>{content}</Content>
          <div>
            <StyledButton
              onClick={() => onAnswer(true)}
              type="button"
              text="Ok"
            />
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
)

  /**
   * Return the text displayed in the card
   */
  function cardContent(): string {
    if (cardFlipState === 'recto') {
      if (question && !isInverted) {
        return question
      }
      else if (answer && isInverted) {
        return answer
      }
      else {
        return ''
      }
    }
    else {
      return isInverted ? question : answer
    }
  }
}