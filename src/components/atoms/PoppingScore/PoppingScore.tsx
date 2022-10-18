import React from 'react';
import PoppingScoreDisplay from './PoppingScoreDisplay';
import { PoppingScoreContext } from '../../../contexts/poppingScore';

export default function PoppingScore() {
  // get score and coordinates from PoppingScoreContext
  const { coordinates, score } = React.useContext(PoppingScoreContext);

  return (
    <PoppingScoreDisplay score={score} coordinates={coordinates} />
  );
}
