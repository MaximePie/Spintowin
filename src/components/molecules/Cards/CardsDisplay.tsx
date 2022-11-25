import React from 'react';
import { Link } from 'react-router-dom';
import { StyledCards, Actions } from './styles';
import { CardsDisplayProps } from './types';
import IconCheckbox from '../../atoms/IconCheckbox/IconCheckbox';
import PoppingScore from '../../atoms/PoppingScore/PoppingScore';
import LoadingGif from '../../atoms/LoadingGif';
import Card from '../Card/Card';

export default function CardsDisplay(props: CardsDisplayProps) {
  const {
    cardsList,
    remainingCards,
    fetchCards,
    isLoading,
    onScoreCheck,
    isScoreDisplayed,
    scoreModeIcon,
    flashModeIcon,
    onFlashModeChange,
    isFlashMode,
    shouldScoreBePoppedOut,
    handleAnswer,
  } = props;
  return (
    <StyledCards>
      <Actions>
        <IconCheckbox
          onChange={onScoreCheck}
          checked={isScoreDisplayed}
          icon={scoreModeIcon}
        />
        <IconCheckbox
          onChange={onFlashModeChange}
          checked={isFlashMode}
          icon={flashModeIcon}
        />
      </Actions>
      <div className="Card Card--static">
        {shouldScoreBePoppedOut && <PoppingScore />}
        <p className="Card__answer">
          {remainingCards}
          {' '}
          cartes
        </p>
        <LoadingGif isLoading={isLoading || false} className="Cards__loading" />
      </div>
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
