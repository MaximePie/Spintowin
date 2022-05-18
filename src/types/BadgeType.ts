import { ObjectId } from 'bson';

type BadgeType = {
  color: string,
  level: number,
  requiredField: string,
  requirementsDescription: string,
  title: string,
  imageUrl: string,
  _id: ObjectId
}

export default BadgeType;
