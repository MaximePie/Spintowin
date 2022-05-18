import React from 'react';
import StatsCard from '../molecules/StatsCard';
import Profile from '../molecules/Profile';
import OngoingStatsData from '../molecules/OngoingStatsData';
import Badges from '../molecules/Badges';
import AnswersBarChart from '../molecules/AnswersBarChart';
import MemorizationBarChart from '../molecules/MemorizationBarChart';

export default function Stats() {
  return (
    <div className="Stats">
      <h1>Statistiques</h1>
      <div className="Stats__list Stats__list--top">
        <Profile />
        <StatsCard
          title="Mémorisation"
          component={<OngoingStatsData />}
        />
      </div>
      <div className="Stats__list">
        <StatsCard title="Badges" component={<Badges />} />
        <StatsCard
          title="Cartes en cours d'apprentissage"
          component={<MemorizationBarChart />}
        />
      </div>
      <div className="Stats__list Stats__list--large">
        <StatsCard title="Réponses" component={<AnswersBarChart />} />
      </div>
    </div>
  );
}
