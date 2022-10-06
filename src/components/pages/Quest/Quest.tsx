import {ChangeEvent, useEffect, useState} from "react";
import QuestDisplay from "./QuestDisplay";
import UserCard from "../../../types/UserCard";
import {useQuery} from "react-query";
import {getFromServer} from "../../../services/server";
import useFetchCards from "../../../services/hooks/useFetchCards";

export default function Quest() {

  const [answer, setAnswer] = useState('');
  const {data, isLoading, error} = useFetchCards();
  const [cards, setCards] = useState<UserCard[]>([]);
  const [remainingCards, setRemainingCards] = useState(0);
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
    const correctAnswer = cards.find((card) => card.answer === answer);
    if (correctAnswer) {

    }
  }

  function updateCardsList() {
    if (data?.cards) {
      setCards(data.cards.slice(0, 5));
      setRemainingCards(data.remainingCards)
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
}