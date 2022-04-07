import {ObjectId} from 'bson';
import {intervals} from "../data/cards";

type CardType = {
  cardId: typeof ObjectId,
  currentDelay: typeof intervals[number],
  isMemorized?: boolean,
}
export default CardType
