import { KeyboardEventHandler, MouseEventHandler } from 'react';
import UserCard from '../../../types/UserCard';

export type CardProps = {
  data: UserCard,
  onAnswer: Function,
  isScoreDisplayed?: boolean,
  isFlashmode?: boolean, // In flashmode state, the card can be validated by left-clicking or being touched
  onUpdate: Function,
  isSingle?: boolean,
  mode?: 'training' | 'review' | 'quest'
}

export type CardDisplayProps =
  Omit<CardProps, 'onAnswer' | 'onUpdate'> & {

  isModalOpen: boolean,
  isAnswerShown: boolean,
  isAnswerSuccessful?: boolean,
  isDisappearing: boolean,
  hasCategoriesDisplayed?: boolean,

  image?: string,
  mode?: string,

  onModalClose: MouseEventHandler,
  onClick: MouseEventHandler,
  onModalOpen: MouseEventHandler,
  onKeypress: KeyboardEventHandler<HTMLDivElement>,
  onRightClick: MouseEventHandler,
  onAnswer: (_isAnswerSuccessful: boolean) => void,
  hints: string[],
}

export type StyledCardProps = {
  noBorders?: boolean,
  isSingle?: boolean,
  isDisappearing?: boolean,
}

export type StyledButtonProps = {
  isFailed?: boolean,
}

export type FlipState = 'recto' | 'verso'
