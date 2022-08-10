import intervals from '../data/cards';
import UserCard from "../types/UserCard";
import UserInterval from "../types/UserInterval";

/**
 * Updates the card according to the given answer
 * @param card - The question card we want to set the new delay on, and if it is memorized or not
 * @param isSuccess - Whether is the question has been answered successfully or not
 *
 * @param userIntervals
 * @return updatedCard - The updated card
 */
export default function generateUpdatedCard(card: UserCard, isSuccess: boolean, userIntervals: UserInterval[]) {
  const updatedCard = {...card};

  const possibleIntervals = userIntervals.filter(({isEnabled}) => isEnabled).map(({value}) => value);
  const closesSuperiorDelay = possibleIntervals
    .find((element, index) => {
        return (
          card.currentDelay <= possibleIntervals[index]
          && card.currentDelay > (possibleIntervals[index - 1] || 0)
        )
      }
    );
  const currentDelayIndex = possibleIntervals.indexOf(closesSuperiorDelay || 0);
  const shouldIncreaseDelay = isSuccess && currentDelayIndex !== 0;

  // Edit data
  if (!updatedCard.currentDelay) { // Reset if interval does not exist
    updatedCard.currentDelay = possibleIntervals[0];
  } else if (shouldIncreaseDelay) {
    updatedCard.currentSuccessfulAnswerStreak += 1;

    let newDelayIndex = currentDelayIndex;
    if (updatedCard.currentSuccessfulAnswerStreak) {
      newDelayIndex += 1;
    } else {
      newDelayIndex += 1;
    }

    // If newDelayIndex is greater than the max interval, set it to memorised
    if (newDelayIndex >= possibleIntervals.length) {
      // Set to the last interval
      if (updatedCard.currentSuccessfulAnswerStreak > 1) {
        updatedCard.currentDelay = possibleIntervals[intervals.length - 1];
      } else {
        // Set to memorized
        updatedCard.isMemorized = true;
      }
    } else {
      updatedCard.currentDelay = possibleIntervals[newDelayIndex];
    }
  } else { // Answer is incorrect
    if (currentDelayIndex > 1) {
      updatedCard.currentDelay = possibleIntervals[currentDelayIndex - 1];
    }
    // updatedCard.currentDelay = intervals[0];
    updatedCard.currentSuccessfulAnswerStreak = 0;
  }

  return updatedCard;
}
