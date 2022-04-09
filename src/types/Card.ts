import { ObjectId } from 'bson';
import ImageType from './ImageType';

type CardType = {
  question: string;
  answer: string;
  _id: typeof ObjectId,
  isAssignedToConnectedUser?: boolean,
  image?: ImageType
}
export default CardType;
