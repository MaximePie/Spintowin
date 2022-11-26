import React from 'react';
import ReviewStatsDisplay from './ReviewStatsDisplay';
import { CardsStats, ReviewStatsProps } from './types';

export default function ReviewStats(props : ReviewStatsProps) {
  const { remainingCards, isLoading, cardsList } = props;

  // create a Set to store the counted intervals
  const cardsStats = {} as CardsStats;
  // loop over the cardsList
  cardsList.filter(({ currentDelay }) => currentDelay >= 5).forEach((card) => {
    // if the interval is not in the Set, add it
    if (!cardsStats[card.currentDelay]) {
      cardsStats[card.currentDelay] = 1;
    } else {
      // if the interval is in the Set, increment its count
      cardsStats[card.currentDelay] += 1;
    }
  });
  // Sort by decreasing delay
  const formattedCardsStats = Object.entries(cardsStats).sort(
    ([delay1], [delay2]) => Number(delay2) - Number(delay1),
  );
  return (
    <ReviewStatsDisplay
      remainingCards={remainingCards}
      isLoading={isLoading}
      cardsStats={formattedCardsStats}
    />
  );
}
