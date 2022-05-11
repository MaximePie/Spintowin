import React from 'react';
import Card from '../../molecules/Card';
import CategorySelect from '../../atoms/CategorySelect';
import {
  StyledReview, Content, Header, Score,
} from './styles';
import useReview from './useReview';

export default function Review() {
  const {
    remainingCards,
    score: {
      numberOfSuccess,
      numberOfFailures,
    },
    isLoading,
    card,
    fetchCard,
    updateCategories,
    handleAnswer,
  } = useReview();

  return (
    <StyledReview>
      <Content>
        <Header>
          Révisons ! (
          {remainingCards}
          )
        </Header>
        <p>
          <Score type="success">{numberOfSuccess}</Score>
          /
          <Score type="failures">{numberOfFailures}</Score>
        </p>
        <CategorySelect
          onSelect={() => {}}
          onSelectMultiple={updateCategories}
          variant="multi"
          value={null}
        />
        {!isLoading && card && (
          <Card
            data={card}
            onAnswer={(isSuccess: boolean) => handleAnswer(isSuccess)}
            onUpdate={fetchCard}
            isSingle
            isScoreDisplayed
            shouldCardsBeInverted={false}
          />
        )}
      </Content>
    </StyledReview>
  );
}
