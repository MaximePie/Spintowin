import React from 'react';
import {
  Stats, StatsListTop, StatsListLarge, IconButton,
} from './styles';
import { StatsDisplayProps } from './types';
import SettingsModal from '../../molecules/SettingsModal/SettingsModal';
import Profile from '../../molecules/Profile';
import StatsCard from '../../molecules/StatsCard';
import AnswersBarChart from '../../molecules/AnswersBarChart';
import Objectives from '../../molecules/Objectives/Objectives';

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
        <Objectives />
      </StatsListTop>
      <StatsListLarge>
        <StatsCard title="Réponses" component={<AnswersBarChart />} />
      </StatsListLarge>
    </Stats>
  );
}
