import React from 'react';
import { faLightbulb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../../atoms/InputGroup/InputGroup';
import QuestionEditionModalProps from './types';
import useQuestionEditionModal from './useQuestionEditionModal';
import {
  CloseButton, Modal, ModalContainer, Form, Fields, Field, Actions, Hints,
} from './styles';
import Button from '../../atoms/Button/Button';

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
    deleteCard,
    hint,
    hints,
    onHintUpdate,
  } = useQuestionEditionModal(props);

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
            <label htmlFor="">
              Petit indice ?
              <InputGroup
                value={hint}
                onChange={onHintUpdate}
                icon={faLightbulb}
                placeholder="Indice"
              />
            </label>
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
                <div>
                  <Field>
                    <label>
                      Question
                      <InputGroup
                        type="text"
                        value={question || ''}
                        onChange={updateQuestion}
                        icon={faQuestion}
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
                        icon={faLightbulb}
                        isIconSolid
                        placeholder="80 - 100 cm"
                      />
                    </label>
                  </div>
                  <label htmlFor="">
                    Petit indice ?
                    <InputGroup
                      value={hint}
                      onChange={onHintUpdate}
                      icon={faLightbulb}
                      placeholder="Indice"
                    />
                  </label>
                </div>
                {hints && (
                  <Hints>
                    <h4>Indices</h4>
                    <ul>
                      {hints?.map((existingHint) => (
                        <li key={existingHint}>
                          {existingHint}
                        </li>
                      ))}
                    </ul>
                  </Hints>
                )}
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
