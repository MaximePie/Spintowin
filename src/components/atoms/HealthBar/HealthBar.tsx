import React from 'react';
import HealthBarDisplay from './HealthBarDisplay';
import { HealthBarProps } from './types';

export default function HealthBar({ currentHealth }: HealthBarProps) {
  return (
    <HealthBarDisplay currentHealth={currentHealth} />
  );
}
