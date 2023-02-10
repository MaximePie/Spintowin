import React from 'react';
import { Link } from 'react-router-dom';
import { StyledCards, Actions } from './styles';
import ReviewStats from '../../atoms/ReviewStats/ReviewStats';
import ReviewProgress from '../../atoms/ReviewProgress/ReviewProgress';

import { CardsDisplayProps } from './types';
import PoppingScore from '../../atoms/PoppingScore/PoppingScore';
import Coin from '../../atoms/Coin/Coin';
import Card from '../Card/Card';
import IconCheckbox from '../../atoms/IconCheckbox/IconCheckbox';
import Button from '../../atoms/Button/Button';

export default function CardsDisplay(props: CardsDisplayProps) {
  const {
    cardsList,
    remainingCards,
    fetchCards,
    isLoading,
    onScoreChange,
    onFlashmodeChange,
    isScoreDisplayed,
    onInfoCardModeChange,
    infoCardMode,
    scoreModeIcon,
    flashModeIcon,
    isFlashMode,
    shouldScoreBePoppedOut,
    hasEarnedACoin,
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
      {hasEarnedACoin && <Coin />}
      <div className="Cards__infoCards">
        <div className="Cards__infoCards__actions">
          <Button
            text="Stats"
            onClick={() => onInfoCardModeChange('stats')}
            className="Cards__infoCards__button"
            type="button"
            variant="secondary"
            isActive={infoCardMode === 'stats'}
          />
          <Button
            text="Progression"
            onClick={() => onInfoCardModeChange('progress')}
            className="Cards__infoCards__button"
            type="button"
            variant="secondary"
            isActive={infoCardMode === 'progress'}
          />
        </div>
        {infoCardMode === 'stats' && (
          <ReviewStats
            remainingCards={remainingCards || 0}
            isLoading={isLoading || false}
            cardsList={cardsList}
          />
        )}
        {infoCardMode === 'progress' && (
          <ReviewProgress />
        )}
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
