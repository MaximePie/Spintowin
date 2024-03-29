import React from 'react';
import { Store } from 'react-notifications-component';
import InputGroup from '../atoms/InputGroup';
import { getFromServer, postOnServer } from '../../services/server';
import handleError from '../../services/errors';
import { CardSuccessNotification } from '../../services/notification';
import UserCardType from '../../types/UserCard';

type QuestionEditionModalProps = {
  card: UserCardType,
  isOwnerOfCard?: boolean
  onClose: Function
}

QuestionEditionModal.defaultProps = {
  isOwnerOfCard: false,
};

export default function QuestionEditionModal(
  { card, onClose, isOwnerOfCard }: QuestionEditionModalProps,
) {
  const {
    answer: initialAnswer, question: initialQuestion, cardId: _id, _id: userCardId,
  } = card;
  const [question, setQuestion] = React.useState(initialQuestion);
  const [answer, setAnswer] = React.useState(initialAnswer);
  return (
    <div className="QuestionEditionModal__container">
      <div className="QuestionEditionModal">
        <span
          role="button"
          className="QuestionEditionModal__close-button"
          tabIndex={0}
          onClick={() => onClose()}
          onKeyUp={(event) => event.key === 'enter' && onClose}
        >
          X
        </span>

        {!isOwnerOfCard && (
          <div>
            <h4>{initialQuestion}</h4>
            <h4>{initialAnswer}</h4>
          </div>
        )}
        <button
          className="QuestionEditionModal__action QuestionEditionModal__action--danger"
          onClick={deleteCard}
          type="button"
        >
          <i className="fas fa-times QuestionEditionModal__action-icon" />
          Supprimer
        </button>
        {isOwnerOfCard && (
          <>
            <div className="QuestionEditionModal__fields">
              <div className="QuestionEditionModal__field">
                <label>
                  Question
                  <InputGroup
                    type="text"
                    value={question || ''}
                    onChange={(event) => setQuestion(event.target.value)}
                    icon="question"
                    isIconSolid
                    placeholder="Quelle est la taille d'un castor ?"
                    className="QuestionEditionModal__field"
                  />
                </label>
              </div>
              <div className="QuestionEditionModal__field">
                <label className="QuestionEditionModal__field">
                  Réponse
                  <InputGroup
                    type="text"
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    icon="lightbulb"
                    isIconSolid
                    placeholder="80 - 100 cm"
                    className="QuestionEditionModal__field"
                  />
                </label>
              </div>
            </div>
            <div className="QuestionEditionModal__actions">
              <button
                onClick={() => onClose()}
                type="button"
                className="QuestionEditionModal__action"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={updateCard}
                className="QuestionEditionModal__action"
              >
                Enregistrer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  /**
   * Calls the card deletion route, then triggers a notification, and close the modal
   *
   * If the user is the owner of the card, this deletes the Card
   * If the user is not the owner of the card, this deletes the UserCard
   */
  function deleteCard() {
    if (isOwnerOfCard) {
      getFromServer(`/cards/delete/${_id}`).then(onSuccessfulDeletion).catch(handleError);
    } else if (!isOwnerOfCard) {
      getFromServer(`/userCards/resorb/${userCardId}`).then(onSuccessfulDeletion);
    }
  }

  /**
   * Displays a notification to the user
   */
  function onSuccessfulDeletion() {
    Store.addNotification({
      ...CardSuccessNotification,
      message: `Votre carte a correctement été supprimée ! Ciao, ${initialQuestion}`,
    });
    onClose();
  }

  /**
   * Calls the card edition route, then triggers a notification, and close the modal
   */
  function updateCard() {
    postOnServer(`/cards/edit/${_id}`, {
      answer: answer !== initialAnswer ? answer : undefined,
      question: question !== initialQuestion ? question : undefined,
    }).then(() => {
      Store.addNotification({
        ...CardSuccessNotification,
        message: 'La carte a été correctement modifiée !',
      });
      onClose();
    });
  }
}
