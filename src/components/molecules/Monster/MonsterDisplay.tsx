import React from 'react';
import { MonsterDisplayProps } from './types';
import { Image, StyledMonster } from './styles';
import HealthBar from '../../atoms/HealthBar/HealthBar';

export default function MonsterDisplay(props: MonsterDisplayProps) {
  const { imageSrc } = props;
  return (
    <StyledMonster>
      <HealthBar currentHealth={100} />
      <Image src={imageSrc} alt="monster" />
    </StyledMonster>
  );
}
