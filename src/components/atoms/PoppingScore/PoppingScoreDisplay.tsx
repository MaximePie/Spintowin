import React from 'react';
import { StyledPoppingScore } from './styles';
import { PoppingScoreDisplayProps } from './types';
import { defaultProps } from './defaultProps';

export default function PoppingScoreDisplay(props: PoppingScoreDisplayProps = defaultProps) {
  const { score, coordinates } = props;

  return (
    <StyledPoppingScore coordinates={coordinates}>
      +
      {' '}
      {score}
    </StyledPoppingScore>
  );
}

PoppingScoreDisplay.defaultProps = defaultProps;
