import React, { useEffect, useState } from 'react';
import StatsCard from '../molecules/StatsCard';
import { getFromServer } from '../../services/server';
import Profile from '../molecules/Profile';

const baseUrl = '/cards/stats';

type WorkInProgress = {
  number: number,
  total: number,
  percentage: number,
}

type serverStatsType = {
  workInProgressData: WorkInProgress,
  score: number,
}

export default function Stats() {
  const [stats, setStats] = useState<serverStatsType>({} as serverStatsType);

  useEffect(fetchStats, []);

  return (
    <div className="Stats">
      <h1>Statistiques</h1>
      {stats && (
        <>
          <div className="Stats__list Stats__list--top">
            <Profile />
            {/* <StatsCard */}
            {/*  title="Mémorisation" */}
            {/*  data={{ */}
            {/*    mainData: stats.workInProgressData, */}
            {/*    total: stats.workInProgressData.total, */}
            {/*  }} */}
            {/* /> */}
          </div>
          <div className="Stats__list">
            <StatsCard title="Badges" />
            {/* <StatsCard */}
            {/*  title="Cartes en cours d'apprentissage" */}
            {/*  data={stats.workInProgressData} */}
            {/* /> */}
          </div>
          <div className="Stats__list Stats__list--large">
            <StatsCard
              title="Wrong Answers"
            />
          </div>
        </>
      )}
    </div>
  );

  function fetchStats() {
    getFromServer(baseUrl).then((response) => {
      setStats(response.data);
    });
  }
}
