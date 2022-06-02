import {UserContext} from "../../../contexts/user";
import React, {ChangeEvent, useContext} from "react";
import {SettingsModalProps} from "./types";
import SettingsModalDisplay from "./SettingsModalDisplay";

export default function SettingsModal(props: SettingsModalProps) {
  const {user, setCategoryDisplayState, setStreakDisplay} = useContext(UserContext);

  return (
    <SettingsModalDisplay
      onClose={props.onClose}
      hasCategoriesDisplayed={user.hasCategoriesDisplayed}
      hasStreakEnabled={user.hasStreakNotifications}
      onCategoryDisplayChange={onCategoryDisplayChange}
      onStreakDisplayChange={onDisplayStreakChange}
    />
  )

  function onCategoryDisplayChange(event: ChangeEvent<HTMLInputElement>) {
    setCategoryDisplayState(event.target.checked);
  }
  function onDisplayStreakChange(event: ChangeEvent<HTMLInputElement>) {
    setStreakDisplay(event.target.checked);
  }
}