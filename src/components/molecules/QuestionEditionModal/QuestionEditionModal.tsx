import React from 'react';
import { faLightbulb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import InputGroup from '../../atoms/InputGroup/InputGroup';
import QuestionEditionModalProps from './types';
import useQuestionEditionModal from './useQuestionEditionModal';
import {
  Form, Fields, Field, Actions, Hints,
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
    tryCloseModal,
  } = useQuestionEditionModal(props);
  return (
    <div className="QuestionEditionModalContainer" onKeyUp={tryCloseModal}>
      <div
        className="QuestionEditionModal"
        onKeyUp={tryCloseModal}
      >
        <div
          className="QuestionEditionModal__close-button"
          role="button"
          tabIndex={0}
          onClick={closeModal}
          onKeyUp={tryCloseModal}
        >
          X
        </div>

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
                  <div className="QuestionEditionModal__hints">
                    <h4>Indices</h4>
                    <ul>
                      {hints?.map((existingHint) => (
                        <li key={existingHint}>
                          {existingHint}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Fields>
              <Actions>
                <Button
                  onClick={closeModal}
                  type="button"
                  variant="secondary"
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
      </div>
    </div>
  );
}
