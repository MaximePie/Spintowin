import React from 'react';
import { StyledPoppingScore, Sparkle, Score } from './styles';
import { PoppingScoreDisplayProps } from './types';
import { defaultProps } from './defaultProps';
import sparkles from '../../../images/sparkle.gif';

export default function PoppingScoreDisplay(props: PoppingScoreDisplayProps = defaultProps) {
  const { score, coordinates } = props;
  // randomly display the sparkles with a 20% chance
  return (
    <StyledPoppingScore coordinates={coordinates}>
      <Score>
        +
        {' '}
        {score}
      </Score>
      {Math.random() > 0.8 && <Sparkle src={sparkles} />}
    </StyledPoppingScore>
  );
}

PoppingScoreDisplay.defaultProps = defaultProps;
