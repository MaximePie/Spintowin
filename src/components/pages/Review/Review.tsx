import React from 'react';
import Card from '../../molecules/Card/Card';
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
    currentCard,
    updateCategories,
    handleAnswer,
    refetch,
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
        {isLoading && <p>Chargement ...</p>}
        {currentCard && (
          <Card
            key={currentCard._id.toString()}
            data={currentCard}
            onAnswer={(isSuccess: boolean) => handleAnswer(isSuccess)}
            onUpdate={refetch}
            isSingle
            isScoreDisplayed
            areInverted={false}
          />
        )}
      </Content>
    </StyledReview>
  );
}
