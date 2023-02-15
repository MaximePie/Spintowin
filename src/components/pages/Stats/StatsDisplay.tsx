import React from 'react';
import {
  Stats, StatsListLarge, IconButton,
} from './styles';
import { StatsDisplayProps } from './types';
import SettingsModal from '../../molecules/SettingsModal/SettingsModal';
import Profile from '../../molecules/Profile';
import StatsCard from '../../molecules/StatsCard';
import AnswersBarChart from '../../molecules/AnswersBarChart';

export default function StatsDisplay({
  areSettingsDisplayed,
  onModalClose,
  onSettingsDisplay,
}: StatsDisplayProps) {
  return (
    <Stats>
      {areSettingsDisplayed && <SettingsModal onClose={onModalClose} />}
      <h1>
        Statistiques
        <IconButton
          icon="fas fa-cog"
          onClick={onSettingsDisplay}
        />
      </h1>
      <div className="Stats__list--top">
        <Profile />
        <div />
      </div>
      <StatsListLarge>
        <StatsCard title="Réponses" component={<AnswersBarChart />} />
      </StatsListLarge>
    </Stats>
  );
}
