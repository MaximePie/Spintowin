import React, {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { playSuccessSound } from '../services/sounds';
import { UserContext } from './user';

const duration = 750;

type Props = {
  children: ReactNode;
}

type Context = {
  displayPopupWithScore: (_score: number) => void,
  shouldScoreBePoppedOut: boolean,
  score: number,
}

export const PoppingScoreContext = createContext({} as Context);

export const PoppingScoreProvider = function (props: Props) {
  let isMounted = true;
  const { user } = useContext(UserContext);

  /**
   * Used to store the popup display timeout
   */
  let timeout: NodeJS.Timeout | undefined;
  const { children } = props;
  const [isDisplayed, setDisplayState] = useState(false);
  const [score, setScore] = useState(5);
  useEffect(onDisplayStateChange, [isDisplayed]);

  return (
    <PoppingScoreContext.Provider value={{
      displayPopupWithScore: displayPopup,
      shouldScoreBePoppedOut: isDisplayed,
      score,
    }}
    >
      {children}
    </PoppingScoreContext.Provider>
  );

  /**
   * Set the score display state to true
   */
  function displayPopup(popupScore: number) {
    removePopup();
    setScore(popupScore);
    setDisplayState(true);
  }

  /**
   * Set the display state to false
   */
  function removePopup() {
    setDisplayState(false);
  }

  /**
   * Effect
   * Set a transition
   * Play a success sound
   * When the timeout is over, set the display state on false
   */
  function onDisplayStateChange() {
    clearTimeout(timeout);

    if (isMounted && isDisplayed) {
      if (user.hasSoundEnabled) playSuccessSound();
      timeout = setTimeout(removePopup, duration);
    }

    return () => {
      isMounted = false;
    };
  }
};
