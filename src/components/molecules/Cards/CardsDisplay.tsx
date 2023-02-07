import React from 'react';
import { Link } from 'react-router-dom';
import { StyledCards, Actions } from './styles';
import ReviewStats from '../../atoms/ReviewStats/ReviewStats';

import { CardsDisplayProps } from './types';
import PoppingScore from '../../atoms/PoppingScore/PoppingScore';
import Card from '../Card/Card';
import IconCheckbox from '../../atoms/IconCheckbox/IconCheckbox';

export default function CardsDisplay(props: CardsDisplayProps) {
  const {
    cardsList,
    remainingCards,
    fetchCards,
    isLoading,
    onScoreChange,
    onFlashmodeChange,
    isScoreDisplayed,
    scoreModeIcon,
    flashModeIcon,
    isFlashMode,
    shouldScoreBePoppedOut,
    handleAnswer,
  } = props;
  return (
    <StyledCards>
      <Actions>
        <IconCheckbox
          onChange={onScoreChange}
          checked={isScoreDisplayed}
          icon={scoreModeIcon}
        />
        <IconCheckbox
          onChange={onFlashmodeChange}
          checked={isFlashMode}
          icon={flashModeIcon}
        />
      </Actions>
      {shouldScoreBePoppedOut && <PoppingScore />}
      <ReviewStats
        remainingCards={remainingCards || 0}
        isLoading={isLoading || false}
        cardsList={cardsList}
      />
      {!isLoading && !cardsList.length && (
      <p>
        Pas de cartes pour le moment,
        <Link to="add">créez-en quelques unes</Link>
        {' '}
        !
      </p>
      )}
      {cardsList.map((card) => (
        <Card
          data={card}
          key={card._id.toString()}
          onAnswer={(isSuccess: boolean) => handleAnswer(card._id, isSuccess)}
          isScoreDisplayed={isScoreDisplayed}
          isFlashmode={isFlashMode}
          onUpdate={fetchCards}
        />
      ))}
    </StyledCards>
  );
}
