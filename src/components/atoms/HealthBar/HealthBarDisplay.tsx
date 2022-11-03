import React from 'react';
import { StyledHealthBar, Bar } from './styles';
import { HealthBarDisplayProps } from './types';

const defaultProps: HealthBarDisplayProps = {
  currentHealth: 50,
};
export default function HealthBarDisplay({ currentHealth }: HealthBarDisplayProps = defaultProps) {
  // Create a progress bar
  return (
    <StyledHealthBar>
      <Bar currentHealth={currentHealth} />
    </StyledHealthBar>
  );
}
