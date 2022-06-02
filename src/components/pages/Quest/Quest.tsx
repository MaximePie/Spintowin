import {ChangeEvent, useEffect, useState} from "react";
import QuestDisplay from "./QuestDisplay";
import UserCard from "../../../types/UserCard";

export default function Quest() {

  const [answer, setAnswer] = useState('');
  const [cards, setCards] = useState<UserCard[]>([]);
  useEffect(initialize, [])


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