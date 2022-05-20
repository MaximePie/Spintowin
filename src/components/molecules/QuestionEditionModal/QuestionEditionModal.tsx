import React from 'react';
import InputGroup from '../../atoms/InputGroup';
import QuestionEditionModalProps from "./types";
import useQuestionEditionModal from "./useQuestionEditionModal";
import {CloseButton, Modal, ModalContainer, Form, Fields, Field, Actions} from "./styles";
import Button from "../../atoms/Button/Button"

QuestionEditionModal.defaultProps = {
  isOwnerOfCard: false,
};

export default function QuestionEditionModal(props: QuestionEditionModalProps) {
  const {
    question,
    updateQuestion,
    answer,
    closeModal,
    isOwnerOfCard,
    initialQuestion,
    initialAnswer,
    updateAnswer,
    save,
    deleteCard
  } = useQuestionEditionModal(props)

  return (
    <ModalContainer>
      <Modal>
        <CloseButton
          role="button"
          tabIndex={0}
          onClick={closeModal}
        >
          X
        </CloseButton>

        {!isOwnerOfCard && (
          <div>
            <h4>{initialQuestion}</h4>
            <h4>{initialAnswer}</h4>
          </div>
        )}
        {isOwnerOfCard && (
          <>
            <Button
              onClick={deleteCard}
              type="button"
              variant="danger"
              icon="fas fa-times"
              text="Supprimer"
            />
            <Form onSubmit={save}>
              <Fields>
                <Field>
                  <label>
                    Question
                    <InputGroup
                      type="text"
                      value={question}
                      onChange={updateQuestion}
                      icon="question"
                      isIconSolid
                      placeholder="Quelle est la taille d'un castor ?"
                    />
                  </label>
                </Field>
                <div>
                  <label>
                    Réponse
                    <InputGroup
                      type="text"
                      value={answer}
                      onChange={updateAnswer}
                      icon="lightbulb"
                      isIconSolid
                      placeholder="80 - 100 cm"
                    />
                  </label>
                </div>
              </Fields>
              <Actions>
                <Button
                  onClick={closeModal}
                  type="button"
                  variant="gray"
                  text="Annuler"
                />
                <Button
                  type="submit"
                  variant="primary"
                  text="Enregistrer"
                />
              </Actions>
            </Form>
          </>
        )}
      </Modal>
    </ModalContainer>
  );
}
