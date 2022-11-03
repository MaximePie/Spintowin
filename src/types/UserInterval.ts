import {ObjectId} from "bson";

type UserInterval = {
  value: number,
  _id: ObjectId,
  isEnabled: boolean,
}

export default UserInterval