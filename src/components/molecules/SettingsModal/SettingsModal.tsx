import {UserContext} from "../../../contexts/user";
import React, {ChangeEvent, useContext} from "react";
import {SettingsModalProps} from "./types";
import SettingsModalDisplay from "./SettingsModalDisplay";

export default function SettingsModal(props: SettingsModalProps) {
  const {user, setCategoryDisplayState} = useContext(UserContext);

  return (
    <SettingsModalDisplay
      onClose={props.onClose}
      hasCategoriesDisplayed={user.hasCategoriesDisplayed}
      onCategoryDisplayChange={onCategoryDisplayChange}
    />
  )

  function onCategoryDisplayChange(event: ChangeEvent<HTMLInputElement>) {
    setCategoryDisplayState(event.target.checked);
  }
}