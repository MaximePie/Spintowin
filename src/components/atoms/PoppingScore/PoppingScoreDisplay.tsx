import React from 'react';
import { PoppingScoreDisplayProps } from './types';
import { defaultProps } from './defaultProps';

const sparkles = 'https://eurekard.s3.eu-west-3.amazonaws.com/sparkle.gif';

export default function PoppingScoreDisplay(props: PoppingScoreDisplayProps = defaultProps) {
  const { score, coordinates, hasSparkles } = props;
  // randomly display the sparkles with a 20% chance
  return (
    <div
      className="PoppingScore"
      style={{
        top: coordinates.y,
        left: coordinates.x,
      }}
    >
      <div
        className="PoppingScore__score"
      >
        +
        {' '}
        {score}
      </div>
      {(hasSparkles || true) && <img src={sparkles} className="PoppingScore__sparkles" alt="Sparkles" />}
    </div>
  );
}

PoppingScoreDisplay.defaultProps = defaultProps;
