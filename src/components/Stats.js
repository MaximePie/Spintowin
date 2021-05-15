import React, {useEffect, useState} from 'react';
import axios from "axios";
import StatsCard from "./StatsCard";
const baseUrl = `${process.env.BASE_URL}/stats`;
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
    axios.get(baseUrl).then(response => {
      setStats(response.data);
    });
  }
}
