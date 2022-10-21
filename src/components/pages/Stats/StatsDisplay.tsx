import React from 'react';
import { Stats, StatsListTop, StatsListLarge } from './styles';
import { StatsDisplayProps } from './types';
import SettingsModal from '../../molecules/SettingsModal/SettingsModal';
import IconButton from '../../atoms/IconButton/IconButton';
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
      <StatsListTop>
        <Profile />
      </StatsListTop>
      <StatsListLarge>
        <StatsCard title="Réponses" component={<AnswersBarChart />} />
      </StatsListLarge>
    </Stats>
  );
}
