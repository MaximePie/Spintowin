import React, {useEffect, useState} from 'react';
import StatsCard from "../molecules/StatsCard";
import {getFromServer} from "../../server";
import Profile from "../molecules/Profile";
const baseUrl = `/cards/stats`;

export default function Stats() {
  const [stats, setStats] = useState(undefined);

  useEffect(fetchStats, []);

  return (
    <div className="Stats">
      <h1>Statistiques</h1>
      {stats && (
        <>
          <div className="Stats__list Stats__list--top">
            <Profile/>
            <StatsCard
              title="Mémorisation"
              data={{
                mainData: stats.memorizedData,
                total: stats.workInProgressData.total,
              }}
            />
          </div>
          <div className="Stats__list">
            <StatsCard title="Badges"/>
            <StatsCard
              title="Cartes en cours d'apprentissage"
              data={stats.workInProgressData}
            />
            <StatsCard
              title="Wrong Answers"
            />
          </div>
        </>
      )}
    </div>
  );

  function fetchStats() {
    getFromServer(baseUrl).then(response => {
      setStats(response.data);
    });
  }
}
