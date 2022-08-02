import {ObjectId} from "bson";

type UserInterval = {
  interval: number,
  _id: ObjectId,
  isEnabled: boolean,
}

export default UserInterval