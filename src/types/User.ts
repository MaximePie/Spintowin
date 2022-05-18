import { ObjectId } from 'bson';

type User = {
  _id: ObjectId
  username: string,
  level: number,
  experience: number,
}

export default User;
