import { ObjectId } from 'bson';
import intervals from '../data/cards';
import ImageType from './ImageType';

type UserCardType = {
  isAssignedToConnectedUser?: boolean;
  _id: typeof ObjectId,
  cardId: typeof ObjectId,
  currentDelay: typeof intervals[number],
  isMemorized?: boolean,
  answer: string,
  question: string,
  image: ImageType,
  isOwnerOfCard: boolean
}
export default UserCardType;
