import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ChangeEventHandler } from 'react';
import UserCard from '../../../types/UserCard';
import CardType from '../../../types/Card';

export type CardsProps = {
  cardsList: UserCard[],
  onCardUpdate: (_card: UserCard, _isSuccessful: boolean) => void,
  fetchCards: Function,
  remainingCards?: number,
  isLoading?: boolean,
}
export type CardsDisplayProps = Omit<CardsProps, 'onCardUpdate'> & {
  onScoreChange: (_isScoreDisplayed: boolean) => void,
  onFlashmodeChange: (_isFlashMode: boolean) => void,
  isScoreDisplayed: boolean,
  shouldScoreBePoppedOut: boolean,
  isFlashMode: boolean,
  handleAnswer: (_cardId: CardType['_id'], _isSuccess: boolean) => void,

  scoreModeIcon: IconDefinition,
  flashModeIcon: IconDefinition,
}
