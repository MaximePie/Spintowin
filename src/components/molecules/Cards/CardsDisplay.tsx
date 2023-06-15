import React from 'react';
import { StyledCards, Actions } from './styles';
import ReviewStats from '../../atoms/ReviewStats/ReviewStats';
import ReviewProgress from '../../atoms/ReviewProgress/ReviewProgress';

import { CardsDisplayProps } from './types';
import PoppingScore from '../../atoms/PoppingScore/PoppingScore';
import Coin from '../../atoms/Coin/Coin';
import Card from '../Card/Card';
import IconCheckbox from '../../atoms/IconCheckbox/IconCheckbox';
import Button from '../../atoms/Button/Button';
import NoCardInfo from '../../atoms/NoCardInfo/NoCardInfo';

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
    isMobile,
  } = props;

  const hasNoCards = !cardsList.length && !isLoading;
  return (
    <StyledCards id="Cards" isMobile={isMobile}>
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
      {hasNoCards && <NoCardInfo />}
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
