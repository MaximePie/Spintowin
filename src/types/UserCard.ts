import { ObjectId } from 'bson';
import intervals from '../data/cards';

type UserCard = {
  isAssignedToConnectedUser?: boolean;
  _id: ObjectId,
  cardId: ObjectId,
  currentDelay: typeof intervals[number],
  isMemorized?: boolean,
  answer: string,
  question?: string,
  hints?: string[],
  image?: string,
  isOwnerOfCard: boolean,
  category: string | null,
  currentSuccessfulAnswerStreak: number,
}
export default UserCard;
