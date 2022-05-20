import React, {useState} from 'react';
import StatsCard from '../molecules/StatsCard';
import Profile from '../molecules/Profile';
import OngoingStatsData from '../molecules/OngoingStatsData';
import Badges from '../molecules/Badges';
import AnswersBarChart from '../molecules/AnswersBarChart';
import MemorizationBarChart from '../molecules/MemorizationBarChart';
import IconButton from "../atoms/IconButton/IconButton";

export default function Stats() {

  const [areSettingsDisplayed, setSettingsDisplay] = useState(false);

  return (
    <div className="Stats">
      {areSettingsDisplayed && <p>Settings are here.</p>}
      <h1>Statistiques
        <IconButton
          icon="fas fa-cog"
          onClick={displaySettings}
        />
      </h1>
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

  function displaySettings() {
    setSettingsDisplay(true);
  }
}
