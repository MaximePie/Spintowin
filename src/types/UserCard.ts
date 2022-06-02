import { ObjectId } from 'bson';
import intervals from '../data/cards';
import ImageType from './ImageType';

type UserCard = {
  isAssignedToConnectedUser?: boolean;
  _id: ObjectId,
  cardId: ObjectId,
  currentDelay: typeof intervals[number],
  isMemorized?: boolean,
  answer: string,
  question: string,
  image: ImageType,
  isOwnerOfCard: boolean,
  category: string | null,
  currentSuccessfulAnswerStreak: number,
}
export default UserCard;
