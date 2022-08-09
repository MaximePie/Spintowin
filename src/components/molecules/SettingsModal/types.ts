import {ChangeEvent, ChangeEventHandler, MouseEventHandler} from "react";
import UserInterval from "../../../types/UserInterval";

export type SettingsModalProps = {
  onClose: MouseEventHandler<HTMLButtonElement>
}

export type SettingsModalDisplayProps = SettingsModalProps & {
  hasCategoriesDisplayed?: boolean,
  hasStreakEnabled?: boolean,
  onCategoryDisplayChange: ChangeEventHandler,
  onStreakDisplayChange: ChangeEventHandler,
  intervals: UserInterval[],
  onIntervalUpdate: (event: ChangeEvent<HTMLInputElement>, intervalId: UserInterval['_id']) => void,
}