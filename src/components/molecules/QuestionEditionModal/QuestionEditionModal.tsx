import React from 'react';
import { faLightbulb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import InputGroup from '../../atoms/InputGroup/InputGroup';
import QuestionEditionModalProps from './types';
import useQuestionEditionModal from './useQuestionEditionModal';
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
  const { isOpen } = props;

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      mountOnEnter
      timeout={300}
      classNames="QuestionEditionModalContainer"
    >
      <div className="QuestionEditionModalContainer">
        <CSSTransition
          in={isOpen}
          unmountOnExit
          mountOnEnter
          timeout={300}
          classNames="QuestionEditionModal"
        >
          <div className="QuestionEditionModal">
            <h2>
              {isOwnerOfCard ? 'Modifier la carte' : 'Voir la carte'}
            </h2>
            <div
              className="QuestionEditionModal__close-button"
              role="button"
              tabIndex={0}
              onClick={closeModal}
              onKeyUp={tryCloseModal}
            >
              x
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
              <div className="QuestionEditionModal__form" onSubmit={save}>
                <div className="QuestionEditionModal__fields">
                  <div>
                    <div className="QuestionEditionModal__field">
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
                    </div>
                    <div className="QuestionEditionModal__field">
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
                    <div className="QuestionEditionModal__field">
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
                  </div>
                  <div className="QuestionEditionModal__hints">
                    <h4>Indices</h4>
                    {hints?.length === 0 && (
                    <p
                      className="QuestionEditionModal__hints-empty"
                    >
                      Ajoutez des indices pour retrouver l&apos;information plus facilement
                    </p>
                    )}
                    <ul>
                      {hints?.map((existingHint) => (
                        <li key={existingHint}>
                          {existingHint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="QuestionEditionModal__actions">
                  <div className="QuestionEditionModal__actions-left">
                    <Button
                      onClick={closeModal}
                      type="button"
                      variant="secondary"
                      text="Annuler"
                    />
                  </div>
                  <div className="QuestionEditionModal__actions-right">
                    <Button
                      onClick={deleteCard}
                      type="button"
                      variant="danger"
                      text="Supprimer"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      text="Enregistrer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}
