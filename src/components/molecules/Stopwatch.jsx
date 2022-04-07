import * as React from 'react';
import ReactStopwatch from 'react-stopwatch';

const Stopwatch = ({className}) => (
  <ReactStopwatch
    hours={0}
    minutes={0}
    seconds={0}
    render={({ formatted}) => {
      return (
        <span className={className}>
            Vous trimez depuis : { formatted }
        </span>
      );
    }}
  />
);

export default Stopwatch;
