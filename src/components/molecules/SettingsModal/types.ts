import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';
import UserInterval from '../../../types/UserInterval';

export type SettingsModalProps = {
  onClose: MouseEventHandler<HTMLButtonElement>
}

export type SettingsModalDisplayProps = SettingsModalProps & {
  hasCategoriesDisplayed?: boolean,
  hasStreakEnabled?: boolean,
  shouldShowIntervals?: boolean,
  hasSoundEnabled?: boolean,
  onCategoryDisplayChange: ChangeEventHandler,
  onStreakDisplayChange: ChangeEventHandler,
  onSoundActivationChange: ChangeEventHandler,
  intervals: UserInterval[],
  onIntervalUpdate: (_event: ChangeEvent<HTMLInputElement>, _intervalId: UserInterval['_id']) => void,
}
