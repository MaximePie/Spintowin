import React from 'react';
import PoppingScoreDisplay from './PoppingScoreDisplay';
import { PoppingScoreProps } from './types';

export default function PoppingScore({ score }: PoppingScoreProps) {
  return (
    <PoppingScoreDisplay score={score} />
  );
}
