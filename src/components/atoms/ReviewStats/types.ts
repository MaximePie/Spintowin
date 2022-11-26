import UserCard from '../../../types/UserCard';

export type CardsStats = { [key: number]: number };

type ReviewStatsProps = {
  remainingCards: number;
  isLoading: boolean;
  cardsList: UserCard[];
}
type ReviewStatsDisplayProps = Omit<ReviewStatsProps, 'cardsList'> & {
  cardsStats: [string, number][];
}

export type { ReviewStatsDisplayProps, ReviewStatsProps };
