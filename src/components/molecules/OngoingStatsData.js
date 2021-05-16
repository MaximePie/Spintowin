import React from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';

export default function OngoingStatsData({data}) {

  const {percentage, number, total} = data;

  return (
    <>
      <p>{data.number} sur {data.total}</p>
      <div className="OngoingStatsData__progressBar">
        <CircularProgressbar
          value={percentage}
          maxValue={100}
          text={`${Math.round(percentage * 100) / 100}%`}
        />
      </div>
    </>
  );
}
