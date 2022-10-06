import UserCard from "../../../types/UserCard";
import {KeyboardEventHandler, MouseEventHandler} from "react";

export type CardProps = {
  data: UserCard,
  onAnswer: Function,
  isScoreDisplayed?: boolean,
  isInverted?: boolean,
  onUpdate: Function,
  isSingle?: boolean,
}

export type CardDisplayProps =
  Omit<CardProps, 'onAnswer' | 'onUpdate'> & {

  isModalOpen: boolean,
  isAnswerShown: boolean,
  isAnswerSuccessful?: boolean,
  hasCategoriesDisplayed?: boolean,

  image?: string,

  onModalClose: MouseEventHandler,
  onClick: MouseEventHandler,
  onModalOpen: MouseEventHandler,
  onKeypress: KeyboardEventHandler<HTMLDivElement>,
  onRightClick: MouseEventHandler,
  onAnswer: (isAnswerSuccessful: boolean) => void,
}


export type StyledCardProps = {
  noBorders?: boolean,
  isSingle?: boolean,
}

export type StyledButtonProps = {
  isFailed?: boolean,
}

export type FlipState = "recto" | "verso"