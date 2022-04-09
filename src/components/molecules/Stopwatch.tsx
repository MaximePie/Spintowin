import * as React from 'react';
// @ts-ignore
import ReactStopwatch from 'react-stopwatch';

type StopwatchProps = {
  className: string,
}

function Stopwatch({ className }: StopwatchProps) {
  return (
    <ReactStopwatch
      hours={0}
      minutes={0}
      seconds={0}
      // @ts-ignore
      render={({ formatted }) => (
        <span className={className}>
          Vous trimez depuis :
          {' '}
          { formatted }
        </span>
      )}
    />
  );
}

export default Stopwatch;
