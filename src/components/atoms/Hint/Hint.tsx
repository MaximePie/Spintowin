import React from 'react';
import HintDisplay from './HintDisplay';
import { HintProps } from './types';

export default function Hint({ hints, cardId: _id }: HintProps) {
  return (
    <HintDisplay hints={hints} cardId={_id} />
  );
}
