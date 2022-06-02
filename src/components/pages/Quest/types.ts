import {ChangeEventHandler} from "react";
import UserCard from "../../../types/UserCard";

export type QuestDisplayProps = {
  answer: string,
  onUserInput: ChangeEventHandler,
  onAnswer: () => void,
  cards: UserCard[],
}
