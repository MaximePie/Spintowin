import React from 'react';
import InputGroup from "../atoms/InputGroup";
import {getFromServer, postOnServer} from "../../server";
import {store} from 'react-notifications-component';
import handleError from "../../services/errors";
import {CardSuccessNotification} from "../../services/notification";

export default function QuestionEditionModal({card, onClose}) {

  const {answer: initialAnswer, question: initialQuestion, _id} = card;
  const [question, setQuestion] = React.useState(initialQuestion);
  const [answer, setAnswer] = React.useState(initialAnswer);
  return (
    <div className="QuestionEditionModal__container">
      <div className="QuestionEditionModal">
        <button
          className="QuestionEditionModal__action QuestionEditionModal__action--danger"
          onClick={deleteCard}
        >
          <i className="fas fa-times QuestionEditionModal__action-icon"/>
          Supprimer
        </button>
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
      </div>
    </div>
  );

  /**
   * Calls the card seletion route, then triggers a notification, and close the modal
   */
  function deleteCard() {
    getFromServer(`/cards/delete/${_id}`).then(() => {
      store.addNotification({
        ...CardSuccessNotification,
        message: `Votre carte a correctement été supprimée ! Ciao, ${initialQuestion}`
      });
      onClose();
    }).catch(handleError);
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
