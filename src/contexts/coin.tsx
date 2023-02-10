import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import { playSuccessSound } from '../services/sounds';
import { UserContext } from './user';

const coinDuration = 3000;

type Props = {
  children: ReactNode;
}

type Context = {
  hasEarnedACoin: boolean,
  earnCoin: (_coordinates: Coordinates | undefined) => void,
  coordinates: Coordinates,
}

export type Coordinates = {
  x: number,
  y: number,
}

/**
 * A coin can be found sometimes allowing user to buy stuff
 */
export const CoinContext = createContext({} as Context);

export function CoinProvider(props: Props) {
  let isMounted = true;
  const { user } = useContext(UserContext);
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });
  const [hasEarnedACoin, setHasEarnedACoin] = useState(false);

  /**
   * Used to store the popup display timeout
   */
  let timeout: any | undefined;
  const { children } = props;
  const [isDisplayed, setDisplayState] = useState(false);
  useEffect(onDisplayStateChange, [isDisplayed]);

  const value = useMemo(() => ({
    hasEarnedACoin,
    earnCoin,
    coordinates,
  }), [hasEarnedACoin, earnCoin, coordinates]);

  return (
    <CoinContext.Provider value={value}>
      {children}
    </CoinContext.Provider>
  );

  /**
   * Set the score display state to true
   */
  function earnCoin(coinImageCoordinates: Coordinates | undefined) {
    removeCoinImage();
    setCoordinates(coinImageCoordinates || { x: 0, y: 0 });
    setHasEarnedACoin(true);
    setDisplayState(true);
  }

  /**
   * Set the display state to false
   */
  function removeCoinImage() {
    setHasEarnedACoin(false);
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
      timeout = setTimeout(removeCoinImage, coinDuration);
    }

    return () => {
      isMounted = false;
    };
  }
}
