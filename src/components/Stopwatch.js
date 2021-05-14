import * as React from 'react';
import ReactStopwatch from 'react-stopwatch';

const Stopwatch = () => (
  <ReactStopwatch
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
