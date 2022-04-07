import React from 'react';
import InputGroup from "../atoms/InputGroup";
import {getFromServer, postOnServer} from "../../services/server";
import {store} from 'react-notifications-component';
import handleError from "../../services/errors";
import {CardSuccessNotification} from "../../services/notification";

import {PropTypes} from 'prop-types';

QuestionEditionModal.propTypes = {
  card: PropTypes.shape({
    score: PropTypes.number,
    wording: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

QuestionEditionModal.defaultProps = {
  isOwnerOfCard: false,
};

export default function QuestionEditionModal({card, onClose, isOwnerOfCard}) {

  const {answer: initialAnswer, question: initialQuestion, cardId: _id, _id: userCardId} = card;
  const [question, setQuestion] = React.useState(initialQuestion);
  const [answer, setAnswer] = React.useState(initialAnswer);
  return (
    <div className="QuestionEditionModal__container">
      <div className="QuestionEditionModal">
        <span
          className="QuestionEditionModal__close-button"
          onClick={onClose}
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
        >
          <i className="fas fa-times QuestionEditionModal__action-icon"/>
          Supprimer
        </button>
        {isOwnerOfCard && (
          <>
            <div className="QuestionEditionModal__fields">
              <div className="QuestionEditionModal__field">
                <label>
                  Question
                </label>
                <InputGroup
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  icon="question"
                  isIconSolid
                  placeholder="Quelle est la taille d'un castor ?"
                  className="QuestionEditionModal__field"
                />
              </div>
              <div className="QuestionEditionModal__field">
                <label className="QuestionEditionModal__field">
                  Réponse
                </label>
                <InputGroup
                  type="text"
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  icon="lightbulb"
                  isIconSolid
                  placeholder="80 - 100 cm"
                  className="QuestionEditionModal__field"
                />
              </div>
            </div>
            <div className="QuestionEditionModal__actions">
              <button onClick={onClose} className="QuestionEditionModal__action">Annuler</button>
              <button
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
    }
    else if (!isOwnerOfCard) {
      console.log(card);
      getFromServer(`/userCards/resorb/${userCardId}`).then(onSuccessfulDeletion)
    }
  }

  /**
   * Displays a notification to the user
   */
  function onSuccessfulDeletion() {
    store.addNotification({
      ...CardSuccessNotification,
      message: `Votre carte a correctement été supprimée ! Ciao, ${initialQuestion}`
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
      store.addNotification({
        ...CardSuccessNotification,
        message: "La carte a été correctement modifiée !",
      })
      onClose();
    })
  }

}
