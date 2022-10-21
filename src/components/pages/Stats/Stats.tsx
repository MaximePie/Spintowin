import React, { useState } from 'react';
import StatsDisplay from './StatsDisplay';

export default function Stats() {
  const [areSettingsDisplayed, setSettingsDisplay] = useState(false);

  function displaySettings() {
    setSettingsDisplay(true);
  }

  function closeModal() {
    setSettingsDisplay(false);
  }

  return (
    <StatsDisplay
      areSettingsDisplayed={areSettingsDisplayed}
      onSettingsDisplay={() => displaySettings()}
      onModalClose={() => closeModal()}
    />
  );
}
