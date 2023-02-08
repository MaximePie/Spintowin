import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/user';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function ReviewProgress() {
  const { user: { experience, level, experienceRequiredForNextLevel } } = useContext(UserContext);

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
    </div>
  );
}
