import React, { ChangeEvent, SyntheticEvent } from 'react';
import { Store } from 'react-notifications-component';
import QuestionEditionModalProps from './types';
import { getFromServer, postOnServer } from '../../../services/server';
import handleError from '../../../services/errors';
import { CardSuccessNotification } from '../../../services/notification';

export default function useQuestionEditionModal(props: QuestionEditionModalProps) {
  const { card, onClose, isOwnerOfCard } = props;
  const {
    answer: initialAnswer,
    question: initialQuestion,
    cardId: _id,
    _id: userCardId,
    hints,
  } = card;
  const [question, setQuestion] = React.useState<string | undefined>(initialQuestion);
  const [answer, setAnswer] = React.useState<string>(initialAnswer);
  const [hint, setHint] = React.useState<string>('');

  /**
   * Close the modal if the user press the escape key
   * @param event The event of the key press (escape)
   */
  function tryCloseModal(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  /**
   * Call the onClose method
   */
  function closeModal() {
    onClose();
  }

  /**
   * Handle the change of the question input
   * @param event The event of the input change (hint) of the form
   */
  function onHintUpdate(event: ChangeEvent<HTMLInputElement>) {
    setHint(event.target.value);
  }

  function updateQuestion(event: ChangeEvent<HTMLInputElement>) {
    setQuestion(event.target.value);
  }

  function updateAnswer(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
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
      hint,
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
    onHintUpdate,
    hint,
    hints,
    tryCloseModal,
  };
}
