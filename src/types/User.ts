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
  /**
   * Current streak of successful answer in the current session,
   * is reset to 0 when the user answers a card incorrectly
   */
  sessionStreak: number,
}

export default User;
