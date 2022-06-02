import {ChangeEventHandler, MouseEventHandler} from "react";

export type SettingsModalProps = {
  onClose: MouseEventHandler<HTMLButtonElement>
}

export type SettingsModalDisplayProps = SettingsModalProps & {
  hasCategoriesDisplayed?: boolean,
  hasStreakEnabled?: boolean,
  onCategoryDisplayChange: ChangeEventHandler,
  onStreakDisplayChange: ChangeEventHandler,
}