import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { UserContext } from '../../../contexts/user';
import streak from '../../../images/streak.png';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function ReviewProgress() {
  const {
    user: {
      experience, level, experienceRequiredForNextLevel,
    },
    session: { sessionStreak },
  } = useContext(UserContext);

  const [animationSwitch, setAnimationSwitch] = useState(false);

  useEffect(() => {
    setAnimationSwitch(!animationSwitch);
  }, [sessionStreak]);

  return (
    <div className="ReviewProgress">
      <div className="ReviewProgress__level">
        Niveau
        {' '}
        {level}
        {' '}
      </div>
      <ProgressBar min={experience} max={experienceRequiredForNextLevel} />

      <div className="ReviewProgress__streak">
        <img
          className="ReviewProgress__streak-image"
          src={streak}
          alt="streak"
        />
        <CSSTransition
          in={animationSwitch}
          classNames="streak"
          timeout={100}
        >
          <span className="ReviewProgress__streak-value">
            x
            {sessionStreak || 0}
          </span>
        </CSSTransition>
      </div>

      <button
        className="ReviewProgress__switch"
        type="button"
        onClick={() => setAnimationSwitch(!animationSwitch)}
      >
        {animationSwitch ? 'off' : 'on'}
      </button>
    </div>
  );
}
