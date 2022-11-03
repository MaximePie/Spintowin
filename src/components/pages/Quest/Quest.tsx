import React, {
  ChangeEvent, FormEvent, useContext, useEffect, useState,
} from 'react';
import { ObjectId } from 'bson';
import QuestDisplay from './QuestDisplay';
import UserCard from '../../../types/UserCard';
import { postOnServer } from '../../../services/server';
import useFetchCards from '../../../services/hooks/useFetchCards';
import generateUpdatedCard, { normalizedString } from '../../../services/card';
import { UserContext } from '../../../contexts/user';
import { QuestContext, QuestContextProvider } from '../../../contexts/quest';

export default function Quest() {
  const [answer, setAnswer] = useState('');
  const { data, refetch } = useFetchCards();
  const [cards, setCards] = useState<UserCard[]>([]);
  const { intervals } = useContext(UserContext);
  const { ignoredCards } = useContext(QuestContext);

  useEffect(updateCardsList, [data]);

  return (
    <QuestContextProvider>
      <QuestDisplay
        answer={answer}
        onUserInput={handleAnswerChange}
        onAttack={() => onAnswer(ignoredCards)}
        cards={cards}
        onFail={updateAndFail}
        onSubmit={handleSubmit}
      />
    </QuestContextProvider>
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer !== '') {
      onAnswer(ignoredCards);
    }
  }

  /**
   * Update the card as the user failed to answer
   * @param cardId
   */
  function updateAndFail(cardId: ObjectId) {
    const failedCard = cards.find(({ _id }) => _id === cardId);
    if (failedCard) {
      const updatedCard = generateUpdatedCard(failedCard, false, intervals);
      triggerCardUpdate(updatedCard);
    }
  }

  function handleAnswerChange(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
  }

  /**
   * Check if the answer is correct or not
   * Send the result to back
   * Remove card from hand
   */
  function onAnswer(ignoredCardsForAnswer: ObjectId[]) {
    // Get answers from cards that are not ignored
    const possibleAnswers = cards
      .filter(({ _id }) => !ignoredCardsForAnswer.includes(_id))
      .map(({ answer: cardAnswer }) => normalizedString(cardAnswer));

    // Find the resolvedCard that matches the possibleAnswers and whose answer
    // is equal to the user's answer
    const resolvedCard: UserCard | undefined = cards.find(({ answer: cardAnswer }) => {
      const normalizedAnswer = normalizedString(cardAnswer);
      return possibleAnswers
        .includes(normalizedAnswer) && normalizedAnswer === normalizedString(answer);
    });

    if (resolvedCard) {
      setAnswer(() => '');
      const updatedCard = generateUpdatedCard(resolvedCard, true, intervals);
      triggerCardUpdate(updatedCard);
      emptyAnswer();
    } else {
      failAtAnswering();
    }
  }

  /**
   * Reset answer to initial state
   */
  function emptyAnswer() {
    setAnswer(() => '');
  }

  /**
   * Deal damage to the hero
   * Empty the answer field
   */
  function failAtAnswering() {
    emptyAnswer();
  }

  function updateCardsList() {
    if (data?.cards) {
      setCards(data.cards.slice(0, 5));
    }

    return () => {
    };
  }

  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card: UserCard) {
    const { currentDelay, isMemorized, _id } = card;
    const updatedCards = [...cards.filter((stateCard) => stateCard._id !== _id)];
    setCards(updatedCards);
    postOnServer(
      `/userCards/update/${card.cardId}`,
      { newDelay: currentDelay || intervals[1], isMemorized },
    ).then(() => refetch(updatedCards));
  }
}
