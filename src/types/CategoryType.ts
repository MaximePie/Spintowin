import { ObjectId } from 'bson';

type CategoryType = {
  _id: ObjectId,
  title: string,
  creatorId: ObjectId,
}

export default CategoryType;
