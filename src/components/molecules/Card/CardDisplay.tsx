import QuestionEditionModal from "../QuestionEditionModal/QuestionEditionModal";
import {CSSTransition} from "react-transition-group";
import React from "react";
import {CardDisplayProps} from "./types"
import {StyledCard, Delay, Image, Question, Edit, StyledButton, Container} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default function CardDisplay(props: CardDisplayProps) {
  const {
    isScoreDisplayed,
    isSingle,
    hasCategoriesDisplayed,
    areInverted,
    isAnswerSuccessful,
    isAnswerShown,
    onAnswer,

    onClick,
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

  return (
    <Container>
      {isModalOpen && (
        <QuestionEditionModal
          card={data}
          onClose={onModalClose}
          isOwnerOfCard={isOwnerOfCard}
        />
      )}

      {!isAnswerShown && isAnswerSuccessful === undefined && (
        <StyledCard
          onClick={onClick}
          role="button"
          tabIndex={0}
          onKeyUp={onKeypress}
          isSingle={isSingle}
          noBorders={!!image && !isSingle}
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
            {question && !areInverted && (
              <Question>{question}</Question>
            )}
            {answer && areInverted && (
              <Question>{answer}</Question>
            )}
            <FontAwesomeIcon icon="coffee" />
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
          {isScoreDisplayed && (
            <Delay>
              🎯
              {currentDelay}
            </Delay>
          )}
          {!areInverted && (
            <Question>{answer}</Question>
          )}
          {areInverted && (
            <Question>{question}</Question>
          )}
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
}