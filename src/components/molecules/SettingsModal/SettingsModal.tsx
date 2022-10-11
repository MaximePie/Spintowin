import React, { ChangeEvent, useContext } from 'react';
import { UserContext } from '../../../contexts/user';
import { SettingsModalProps } from './types';
import SettingsModalDisplay from './SettingsModalDisplay';
import UserInterval from '../../../types/UserInterval';

export default function SettingsModal(props: SettingsModalProps) {
  const { onClose } = props;

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
      intervals={intervals}
      onIntervalUpdate={onIntervalChange}
      shouldShowIntervals={user.role === 'admin'}
      onSoundActivationChange={onSoundActivationChange}
      hasSoundEnabled={user.hasSoundEnabled}
    />
  );

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
