import React from 'react';
import { StyledPoppingScore, Sparkle, Score } from './styles';
import { PoppingScoreDisplayProps } from './types';
import { defaultProps } from './defaultProps';

const sparkles = 'https://eurekard.s3.eu-west-3.amazonaws.com/sparkle.gif';

export default function PoppingScoreDisplay(props: PoppingScoreDisplayProps = defaultProps) {
  const { score, coordinates, hasSparkles } = props;
  // randomly display the sparkles with a 20% chance
  return (
    <StyledPoppingScore coordinates={coordinates}>
      <Score>
        +
        {' '}
        {score}
      </Score>
      {hasSparkles && <Sparkle src={sparkles} />}
    </StyledPoppingScore>
  );
}

PoppingScoreDisplay.defaultProps = defaultProps;
