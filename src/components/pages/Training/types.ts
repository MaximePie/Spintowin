import UserCard from "../../../types/UserCard";

export type TrainingDisplayProps = {
  cards: UserCard[],
  triggerCardUpdate: (card: UserCard) => void,
  remainingCards: number,
  fetchCards: () => void,
  isLoading: boolean,
}

export type TrainingCardsQuery = {
  cards: UserCard[],
  remainingCards: number,
}