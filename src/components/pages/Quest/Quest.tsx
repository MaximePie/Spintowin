import {ChangeEvent, useContext, useEffect, useState} from "react";
import QuestDisplay from "./QuestDisplay";
import UserCard from "../../../types/UserCard";
import {postOnServer} from "../../../services/server";
import useFetchCards from "../../../services/hooks/useFetchCards";
import generateUpdatedCard from "../../../services/card";
import {UserContext} from "../../../contexts/user";

export default function Quest() {

  const [answer, setAnswer] = useState('');
  const {data, refetch} = useFetchCards();
  const [cards, setCards] = useState<UserCard[]>([]);
  const {user: {hasStreakNotifications}, intervals} = useContext(UserContext);

  useEffect(initialize, [])
  useEffect(updateCardsList, [data])


  return <QuestDisplay
    answer={answer}
    onUserInput={handleAnswerChange}
    onAnswer={onAnswer}
    cards={cards}
  />

  function handleAnswerChange(event: ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
  }

  /**
   * Check if the answer is correct or not
   * Send the result to back
   * Remove card from hand
   */
  function onAnswer() {
    const resolvedCard = cards.find((card) => card.answer === answer);
    if (resolvedCard) {
      // Get data
      const updatedCard = generateUpdatedCard(resolvedCard, true, intervals);
      triggerCardUpdate(updatedCard);
    }
  }

  function updateCardsList() {
    if (data?.cards) {
      setCards(data.cards.slice(0, 5));
    }

    return () => {}
  }


  /**
   * Set the 'Enter' event listener
   */
  function initialize() {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'enter') {
        onAnswer();
      }
    })

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