import React, {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { playSuccessSound } from '../services/sounds';
import { UserContext } from './user';
import { poppingScoreDuration as duration } from '../components/atoms/PoppingScore/helpers';

type Props = {
  children: ReactNode;
}

type Context = {
  displayPopupWithScore: (_score: number, _coordinates: Coordinates | undefined) => void,
  shouldScoreBePoppedOut: boolean,
  score: number,
  coordinates: Coordinates,
}

export type Coordinates = {
  x: number,
  y: number,
}

export const PoppingScoreContext = createContext({} as Context);

export function PoppingScoreProvider(props: Props) {
  let isMounted = true;
  const { user } = useContext(UserContext);

  /**
   * Used to store the popup display timeout
   */
  let timeout: NodeJS.Timeout | undefined;
  const { children } = props;
  const [isDisplayed, setDisplayState] = useState(false);
  const [score, setScore] = useState(5);
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  useEffect(onDisplayStateChange, [isDisplayed]);

  return (
    <PoppingScoreContext.Provider value={{
      coordinates,
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
  function displayPopup(popupScore: number, popupCoordinates: Coordinates | undefined) {
    removePopup();
    setScore(popupScore);
    setCoordinates(popupCoordinates || { x: 0, y: 0 });
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
}
