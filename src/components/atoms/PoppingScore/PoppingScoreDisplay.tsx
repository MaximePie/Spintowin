import React from 'react';
import { StyledPoppingScore } from './styles';
import { PoppingScoreDisplayProps } from './types';
import { defaultProps } from './defaultProps';

export default function PoppingScoreDisplay(props: PoppingScoreDisplayProps = defaultProps) {
  const { score } = props;

  return (
    <StyledPoppingScore>
      +
      {' '}
      {score}
    </StyledPoppingScore>
  );
}

PoppingScoreDisplay.defaultProps = defaultProps;
