import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/user';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function ReviewProgress() {
  const {
    user: {
      experience, level, experienceRequiredForNextLevel, sessionStreak,
    },
  } = useContext(UserContext);

  return (
    <div className="ReviewProgress">
      <div className="ReviewProgress__level">
        Niveau
        {' '}
        {level}
        {' '}
        (
        {experience}
        /
        {experienceRequiredForNextLevel}
        )
      </div>
      <ProgressBar min={experience} max={experienceRequiredForNextLevel} />

      <div className="ReviewProgress__streak">
        Série en cours
        {' '}
        {sessionStreak || 0}
      </div>
    </div>
  );
}
