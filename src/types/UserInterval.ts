import { ObjectId } from 'bson';

type UserInterval = {
  value: number,
  _id: ObjectId,
  isEnabled: boolean,

  displayValue?: string,
}

export default UserInterval;
