import {createContext, ReactNode, useEffect, useState} from "react";
import {playSuccessSound} from "../services/sounds";

type Props = {
  children: ReactNode;
}

type Context = {
  displayPopupWithScore: (score: number) => void,
  shouldScoreBePoppedOut: boolean,
  score: number,
}


export const PoppingScoreContext = createContext({} as Context);

export const PoppingScoreProvider = function (props: Props) {
  let isMounted = true;

  /**
   * Used to store the popup display timeout
   */
  let timeout: NodeJS.Timeout | undefined = undefined;
  const {children} = props;
  const [isDisplayed, setDisplayState] = useState(false);
  const [score, setScore] = useState(5);
  useEffect(onDisplayStateChange, [isDisplayed])

  return (
    <PoppingScoreContext.Provider value={{
      displayPopupWithScore: displayPopup,
      shouldScoreBePoppedOut: isDisplayed,
      score
    }}>
      {children}
    </PoppingScoreContext.Provider>
  )

  /**
   * Set the score display state to true
   */
  function displayPopup(score: number) {
    removePopup();
    setScore(score);
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
      playSuccessSound();

      timeout = setTimeout(removePopup, 1000)
    }

    return () => {
      isMounted = false;
    }
  }
}