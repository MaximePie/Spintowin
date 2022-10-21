import { KeyboardEventHandler, MouseEventHandler } from 'react';
import UserCard from '../../../types/UserCard';

export type CardProps = {
  data: UserCard,
  onAnswer: Function,
  isScoreDisplayed?: boolean,
  isInverted?: boolean,
  onUpdate: Function,
  isSingle?: boolean,
  mode?: 'training' | 'review' | 'quest'
}

export type CardDisplayProps =
  Omit<CardProps, 'onAnswer' | 'onUpdate'> & {

  isModalOpen: boolean,
  isAnswerShown: boolean,
  isAnswerSuccessful?: boolean,
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
}

export type StyledButtonProps = {
  isFailed?: boolean,
}

export type FlipState = 'recto' | 'verso'
