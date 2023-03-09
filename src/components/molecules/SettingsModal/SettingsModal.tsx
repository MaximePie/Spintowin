import React, { ChangeEvent, useContext } from 'react';
import { UserContext } from '../../../contexts/user';
import { SettingsModalProps } from './types';
import SettingsModalDisplay from './SettingsModalDisplay';
import UserInterval from '../../../types/UserInterval';
import { getFormattedInterval } from '../../../services/time';

export default function SettingsModal(props: SettingsModalProps) {
  const { onClose, isOpen } = props;

  const {
    user,
    setCategoryDisplayState,
    setStreakDisplay,
    updateInterval,
    intervals,
    setSoundActivation,
  } = useContext(UserContext);
  return user && (
    <SettingsModalDisplay
      onClose={onClose}
      hasCategoriesDisplayed={user.hasCategoriesDisplayed}
      hasStreakEnabled={user.hasStreakNotifications}
      onCategoryDisplayChange={onCategoryDisplayChange}
      onStreakDisplayChange={onDisplayStreakChange}
      intervals={formattedIntervals(intervals)}
      onIntervalUpdate={onIntervalChange}
      shouldShowIntervals={user.role === 'admin'}
      onSoundActivationChange={onSoundActivationChange}
      hasSoundEnabled={user.hasSoundEnabled}
      isOpen={isOpen}
    />
  );

  /**
   * Format the intervals to display the appropriate duration
   * @param rawIntervals - The intervals to format
   * @returns The formatted intervals array with the new value
   */
  function formattedIntervals(rawIntervals: UserInterval[]): UserInterval[] {
    return rawIntervals.map((interval) => ({
      ...interval,
      displayValue: getFormattedInterval(interval.value),
    }));
  }

  /**
   * Update the User's choice about the sound
   * @param event
   */
  function onSoundActivationChange(event: ChangeEvent<HTMLInputElement>) {
    setSoundActivation(event.target.checked);
  }

  function onCategoryDisplayChange(event: ChangeEvent<HTMLInputElement>) {
    setCategoryDisplayState(event.target.checked);
  }

  function onDisplayStreakChange(event: ChangeEvent<HTMLInputElement>) {
    setStreakDisplay(event.target.checked);
  }

  /**
   * Call the updateIntervals fonction in user context with the updated intervals value
   * @param event
   * @param intervalID
   */
  function onIntervalChange(event: ChangeEvent<HTMLInputElement>, intervalID: UserInterval['_id']) {
    updateInterval(intervalID, event.target.checked);
  }
}
