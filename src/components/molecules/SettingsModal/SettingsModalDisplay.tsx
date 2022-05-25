import {SettingsModalDisplayProps} from "./types";
import {CloseButton, Field, Modal, ModalContainer} from "./styles";
import React from "react";

SettingsModalDisplay.defaultProps = {
  hasCategoriesDisplayed: false,
}
export default function SettingsModalDisplay({onClose, hasCategoriesDisplayed, onCategoryDisplayChange}: SettingsModalDisplayProps) {
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
      </Modal>
    </ModalContainer>
  )
}