import UserCard from '../../../types/UserCard';

export type TrainingDisplayProps = {
  cards: UserCard[],
  onCardUpdate: (_card: UserCard, _isSuccessful: boolean) => void,
  remainingCards: number,
  fetchCards: () => void,
  isLoading: boolean,
}

export type TrainingCardsQuery = {
  cards: UserCard[],
  remainingCards: number,
}
