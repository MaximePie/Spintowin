import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { UserContext } from '../../../contexts/user';
import streak from '../../../images/streak.png';
import ProgressBar from '../ProgressBar/ProgressBar';

/**
 * ReviewProgress component
 * @component ReviewProgress component to display the user's level, streak, and more information
 * @returns {JSX.Element} - ReviewProgress component
 */

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
        {`Niv ${level}`}
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
          <span
            className={`ReviewProgress__streak-value ReviewProgress__streak-value--${sessionColor()}`}
          >
            x
            {sessionStreak || 0}
          </span>
        </CSSTransition>
      </div>
    </div>
  );

  /**
   * Returns the color of the streak based on the streak value
   * @returns {string} - The color of the streak (green, orange, red, blue)
   */
  function sessionColor() {
    if (sessionStreak > 10) {
      return 'green';
    }
    if (sessionStreak > 5) {
      return 'orange';
    }
    if (sessionStreak > 3) {
      return 'red';
    }
    return 'blue';
  }
}
