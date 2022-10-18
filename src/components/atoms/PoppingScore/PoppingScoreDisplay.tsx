import React from 'react';
import { StyledPoppingScore, Sparkle, Score } from './styles';
import { PoppingScoreDisplayProps } from './types';
import { defaultProps } from './defaultProps';
import sparkles from '../../../images/sparkle.gif';

export default function PoppingScoreDisplay(props: PoppingScoreDisplayProps = defaultProps) {
  const { score, coordinates } = props;

  return (
    <StyledPoppingScore coordinates={coordinates}>
      <Score>
        +
        {' '}
        {score}
      </Score>
      <Sparkle src={sparkles} />
    </StyledPoppingScore>
  );
}

PoppingScoreDisplay.defaultProps = defaultProps;
