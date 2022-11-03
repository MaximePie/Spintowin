import React from 'react';
import monster from '../../../images/monster_1.png';
import MonsterDisplay from './MonsterDisplay';

/**
 * call a MonsterDisplay Component to display the monster
 */
export default function Monster() {
  return (
    <div>
      <MonsterDisplay imageSrc={monster} />
    </div>
  );
}
