import UserCard from "../../../types/UserCard";
import {ObjectId} from "bson";
export type CardsHandProps = {
  cards: UserCard[],
  onFail: (cardId: ObjectId) => void,
}

export type CardsHandDisplayProps = CardsHandProps