import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import UserCard from '../../../types/UserCard';
import CardType from '../../../types/Card';

export type CardsProps = {
  cardsList: UserCard[],
  onCardUpdate: (_card: UserCard, _isSuccessful: boolean, _earnedCoins: number) => void,
  fetchCards: Function,
  remainingCards?: number,
  isLoading?: boolean,
}
export type CardsDisplayProps = Omit<CardsProps, 'onCardUpdate'> & {
  onScoreChange: (_isScoreDisplayed: boolean) => void,
  onFlashmodeChange: (_isFlashMode: boolean) => void,
  onInfoCardModeChange: (_mode: InfoCardMode) => void,
  infoCardMode: InfoCardMode,
  isScoreDisplayed: boolean,
  shouldScoreBePoppedOut: boolean,
  hasEarnedACoin: boolean,
  isFlashMode: boolean,
  handleAnswer: (_cardId: CardType['_id'], _isSuccess: boolean) => void,
  isMobile?: boolean,

  scoreModeIcon: IconDefinition,
  flashModeIcon: IconDefinition,
}

export type InfoCardMode = 'progress' | 'stats'
