import React from 'react';
import PoppingScoreDisplay from './PoppingScoreDisplay';
import { PoppingScoreContext } from '../../../contexts/poppingScore';

export default function PoppingScore() {
  // get score and coordinates from PoppingScoreContext
  const { coordinates, score } = React.useContext(PoppingScoreContext);
  const hasSparkles = Math.random() > 0.8;

  return (
    <PoppingScoreDisplay score={score} coordinates={coordinates} hasSparkles={hasSparkles} />
  );
}
