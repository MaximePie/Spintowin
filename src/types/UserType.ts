import { ObjectId } from 'bson';

type UserType = {
  _id: ObjectId
  username: string,
  level: number,
  experience: number,
}

export default UserType;
