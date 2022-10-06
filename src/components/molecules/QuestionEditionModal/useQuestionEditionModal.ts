import React, {ChangeEvent, FormEventHandler, SyntheticEvent} from "react";
import QuestionEditionModalProps from "./types";
import {getFromServer, postOnServer} from "../../../services/server";
import handleError from "../../../services/errors";
import {Store} from "react-notifications-component";
import {CardSuccessNotification} from "../../../services/notification";

export default function useQuestionEditionModal(props: QuestionEditionModalProps) {
  const { card, onClose, isOwnerOfCard } = props;
  const {
    answer: initialAnswer,
    question: initialQuestion,
    cardId: _id,
    _id: userCardId,
  } = card;
  const [question, setQuestion] = React.useState<string | undefined>(initialQuestion);
  const [answer, setAnswer] = React.useState<string>(initialAnswer);

  /**
   * Call the onClose method
   */
  function closeModal() {
    onClose();
  }

  function updateQuestion(event: ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value)
  }

  function updateAnswer(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value)
  }


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
  function save(event: SyntheticEvent) {
    event.preventDefault();
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

  return {
    question,
    answer,
    closeModal,
    isOwnerOfCard,
    initialAnswer,
    initialQuestion,
    updateQuestion,
    updateAnswer,
    save,
    deleteCard,
  }
}