import React from 'react';
import { render } from '@testing-library/react';
import { ObjectId } from 'bson';
import Cards from '../components/molecules/Cards/Cards';
import UserCard from '../types/UserCard';
import { UserContextProvider } from '../contexts/user';
import { ViewportContextProvider } from '../contexts/viewport';

const cards: UserCard[] = [
  {
    _id: new ObjectId(),
    cardId: new ObjectId(),
    currentDelay: 1,
    isOwnerOfCard: true,
    category: null,
    currentSuccessfulAnswerStreak: 0,
    answer: 'test',
    question: 'test',
    hints: ['test'],
    image: 'random',
  },
];

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
      <ViewportContextProvider>{children}</ViewportContextProvider>
    </UserContextProvider>
  );
}

describe('Cards', () => {
  it('should render correctly', () => {
    render(<Cards
      cardsList={cards}
      fetchCards={() => {}}
      remainingCards={cards.length}
      isLoading={false}
      onCardUpdate={() => {}}
    />, {
      wrapper: Wrapper,
    });
  });
});
