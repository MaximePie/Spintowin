import {ChangeEvent, useContext, useEffect, useState} from "react";
import QuestDisplay from "./QuestDisplay";
import UserCard from "../../../types/UserCard";
import {postOnServer} from "../../../services/server";
import useFetchCards from "../../../services/hooks/useFetchCards";
import generateUpdatedCard from "../../../services/card";
import {UserContext} from "../../../contexts/user";
import {QuestContextProvider} from "../../../contexts/quest";
import {ObjectId} from "bson";

export default function Quest() {

  const [answer, setAnswer] = useState('');
  const {data, refetch} = useFetchCards();
  const [cards, setCards] = useState<UserCard[]>([]);
  const {user: {hasStreakNotifications}, intervals} = useContext(UserContext);

  useEffect(updateCardsList, [data])


  return (
    <QuestContextProvider>
      <QuestDisplay
        answer={answer}
        onUserInput={handleAnswerChange}
        onAttack={onAnswer}
        cards={cards}
        onFail={updateAndFail}
      />
    </QuestContextProvider>
  )


  /**
   * Update the card as the user failed to answer
   * @param cardId
   */
  function updateAndFail(cardId: ObjectId) {
    const failedCard = cards.find(({_id}) => _id === cardId);
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
  function onAnswer(ignoredCards: ObjectId[]) {
    const resolvedCard = cards.find((card) => {
      if (!ignoredCards.includes(card._id)) {

        return card.answer === answer
      }
      else {
        return false;
      }
    });
    if (resolvedCard) {
      setAnswer(answer => '');
      const updatedCard = generateUpdatedCard(resolvedCard, true, intervals);
      triggerCardUpdate(updatedCard);
      emptyAnswer();
    }
    else {
      failAtAnswering();
    }
  }

  /**
   * Reset answer to initial state
   */
  function emptyAnswer() {
    setAnswer(answer => '');
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

    return () => {}
  }


  /**
   * Triggers the request to update the Card after a given Answer
   * @param card
   */
  function triggerCardUpdate(card: UserCard) {
    const {currentDelay, isMemorized, _id} = card;
    const updatedCards = [...cards.filter((stateCard) => stateCard._id !== _id)];
    setCards(updatedCards)

    postOnServer(
      `/userCards/update/${card.cardId}`,
      {newDelay: currentDelay || intervals[1], isMemorized},
    ).then(() => refetch(updatedCards))
  }
}