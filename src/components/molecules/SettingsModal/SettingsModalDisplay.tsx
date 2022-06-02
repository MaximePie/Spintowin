import {SettingsModalDisplayProps} from "./types";
import {CloseButton, Field, Modal, ModalContainer} from "./styles";
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
    hasStreakEnabled
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
      </Modal>
    </ModalContainer>
  )
}