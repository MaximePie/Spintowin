import {ChangeEventHandler, MouseEventHandler} from "react";

export type SettingsModalProps = {
  onClose: MouseEventHandler<HTMLButtonElement>
}

export type SettingsModalDisplayProps = SettingsModalProps & {
  hasCategoriesDisplayed?: boolean,
  onCategoryDisplayChange: ChangeEventHandler
}