import {intervals} from "../data/cards";
import {store} from "react-notifications-component";
import {memorisedNotification} from "./notification";

/**
 * Updates the card according to the given answer
 * @param card - The question card we want to set the new delay on, and if it is memorized or not
 * @param isSuccess - Whether is the question has been answered successfully or not
 *
 * @return updatedCard - The updated card
 */
export function generateUpdatedCard(card, isSuccess) {
  let updatedCard = {...card};
  const currentDelayIndex = intervals.indexOf(updatedCard.currentDelay);
  const shouldIncreaseDelay = isSuccess && currentDelayIndex !== 0;

  // Edit data
  if (!updatedCard.currentDelay) { // Reset if interval does not exist
    updatedCard.currentDelay = intervals[1];
  } else if (shouldIncreaseDelay) {
    let newDelayIndex = currentDelayIndex;
    if (updatedCard.currentSuccessfulAnswerStreak) {
      newDelayIndex += updatedCard.currentSuccessfulAnswerStreak;
    }
    else {
      newDelayIndex += 1;
    }

    // If newDelayIndex is greater than the max interval, set it to memorised
    if (newDelayIndex >= intervals.length) {

      // Set to the last interval
      if(updatedCard.currentSuccessfulAnswerStreak > 1) {
        updatedCard.currentDelay = intervals[intervals.length];
        updatedCard.currentSuccessfulAnswerStreak = 0
      }
      else {
        // Set to memorized
        updatedCard.isMemorized = true;
      }
    }
    else {
      updatedCard.currentDelay = intervals[newDelayIndex];
    }
  } else {
    updatedCard.currentDelay = intervals[currentDelayIndex - 1];
  }

  return updatedCard
}