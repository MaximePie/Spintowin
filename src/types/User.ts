import { ObjectId } from 'bson';

type User = {
  _id: ObjectId
  username: string,
  level: number,
  experience: number,
  hasCategoriesDisplayed?: boolean,
}

export default User;
