import React, {useEffect, useState} from 'react';
import StatsCard from "./StatsCard";
import {getFromServer} from "../server";
const baseUrl = `/cards/stats`;
export default function Stats() {
  const [stats, setStats] = useState(undefined);

  useEffect(fetchStats, []);

  return (
    <div className="Stats">
      <h1>Statistiques</h1>
      <p>Vous avancez bien, bravo !</p>
      {stats && (
        <div className="Stats__list">
          <StatsCard
            title="Cartes en cours d'apprentissage"
            data={stats.workInProgressData}
          />
          <StatsCard
            title="Score"
            data={stats.score}
          />
          <StatsCard
            title="Mémorisation"
            data={stats.memorizedData}
          />
        </div>
      )}
      {JSON.stringify(stats)}
    </div>
  );

  function fetchStats() {
    getFromServer(baseUrl).then(response => {
      setStats(response.data);
    });
  }
}
