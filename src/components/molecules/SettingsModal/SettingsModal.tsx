import {UserContext} from "../../../contexts/user";
import React, {ChangeEvent, useContext} from "react";
import { ModalContainer, Modal, Field, CloseButton } from "./styles";
import {SettingsModalProps} from "./types";

export default function SettingsModal({onClose}: SettingsModalProps) {
  const {user, setCategoryDisplayState} = useContext(UserContext);

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
            checked={user.hasCategoriesDisplayed}
            onChange={onCategoryDisplayChange}
          />
        </Field>
      </Modal>
    </ModalContainer>
  )

  function onCategoryDisplayChange(event: ChangeEvent<HTMLInputElement>) {
    setCategoryDisplayState(event.target.checked);
  }
}