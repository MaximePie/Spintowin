import * as React from 'react';
import ReactStopwatch from 'react-stopwatch';

const Stopwatch = () => (
  <ReactStopwatch
    hours={0}
    minutes={0}
    seconds={0}
    render={({ formatted}) => {
      return (
        <span>
            Vous trimez depuis : { formatted }
        </span>
      );
    }}
  />
);

export default Stopwatch;
