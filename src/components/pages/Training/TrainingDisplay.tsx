import React from 'react';
import Cards from '../../molecules/Cards/Cards';
import { TrainingDisplayProps } from './types';

export default function TrainingDisplay(props: TrainingDisplayProps) {
  const {
    remainingCards,
    fetchCards,
    isLoading,
    onCardUpdate,
    cards,
  } = props;

  return (
    <div>
      <Cards
        cardsList={cards}
        onCardUpdate={onCardUpdate}
        remainingCards={remainingCards}
        fetchCards={fetchCards}
        isLoading={isLoading}
      />
    </div>
  );
}
