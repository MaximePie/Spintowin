import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ChangeEventHandler } from 'react';
import UserCard from '../../../types/UserCard';
import CardType from '../../../types/Card';

export type CardsProps = {
  cardsList: UserCard[],
  triggerCardUpdate: Function,
  fetchCards: Function,
  remainingCards?: number,
  isLoading?: boolean,
}
export type CardsDisplayProps = Omit<CardsProps, 'triggerCardUpdate'> & {
  onScoreCheck: ChangeEventHandler<HTMLInputElement>,
  onFlashModeChange: ChangeEventHandler<HTMLInputElement>,
  isScoreDisplayed: boolean,
  shouldScoreBePoppedOut: boolean,
  isFlashMode: boolean,
  handleAnswer: (_cardId: CardType['_id'], _isSuccess: boolean) => void,

  scoreModeIcon: IconDefinition,
  flashModeIcon: IconDefinition,
}
