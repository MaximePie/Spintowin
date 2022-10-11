import { ObjectId } from 'bson';
import UserInterval from './UserInterval';

type User = {
  _id: ObjectId
  username: string,
  role: string,
  level: number,
  experience: number,
  hasCategoriesDisplayed?: boolean,
  hasStreakNotifications?: boolean,
  hasSoundEnabled?: boolean,
  intervals: UserInterval[],
}

export default User;
