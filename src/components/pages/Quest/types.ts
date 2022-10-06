import {ChangeEventHandler} from "react";
import UserCard from "../../../types/UserCard";
import {ObjectID} from "bson";

export type QuestDisplayProps = {
  answer: string,
  onUserInput: ChangeEventHandler,
  onAttack: (ignoredCards: ObjectID[]) => void,
  onFail: (cardId: ObjectID) => void,
  cards: UserCard[],
}
