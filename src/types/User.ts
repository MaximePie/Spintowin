import { ObjectId } from 'bson';
import UserInterval from './UserInterval';

type User = {
  _id: ObjectId
  username: string,
  role: string,
  level: number,
  experience: number,
  experienceRequiredForNextLevel: number,
  hasCategoriesDisplayed?: boolean,
  hasStreakNotifications?: boolean,
  hasSoundEnabled?: boolean,
  intervals: UserInterval[],
  limitDate?: string,
  remainingCards?: number,
}

export default User;
