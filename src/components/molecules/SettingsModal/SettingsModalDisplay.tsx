import {SettingsModalDisplayProps} from "./types";
import {CloseButton, Field, Modal, ModalContainer, Intervals} from "./styles";
import React from "react";

SettingsModalDisplay.defaultProps = {
  hasCategoriesDisplayed: false,
}
export default function SettingsModalDisplay(props: SettingsModalDisplayProps) {
  const {
    onClose,
    hasCategoriesDisplayed,
    onCategoryDisplayChange,
    onStreakDisplayChange,
    hasStreakEnabled,
    intervals,
    onIntervalUpdate,
  } = props;

  return (
    <ModalContainer>
      <Modal>
        <CloseButton
          role="button"
          tabIndex={0}
          onClick={onClose}
        >
          X
        </CloseButton>
        <Field>
          <label>Afficher les catégories</label>
          <input
            type="checkbox"
            checked={hasCategoriesDisplayed}
            onChange={onCategoryDisplayChange}
          />
        </Field>
        <Field>
          <label>Afficher les notifications de série</label>
          <input
            type="checkbox"
            checked={hasStreakEnabled}
            onChange={onStreakDisplayChange}
          />
        </Field>
        <Intervals>
          {intervals.map(userInterval => (
            <Field>
              <label>{userInterval.value}</label>
              <input
                type="checkbox"
                checked={userInterval.isEnabled}
                onChange={(event) => onIntervalUpdate(event, userInterval._id)}
              />
            </Field>
          ))}
        </Intervals>
      </Modal>
    </ModalContainer>
  )
}