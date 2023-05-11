import { Types } from 'mongoose';

export default function createObjectId(objectIdString: string): Types.ObjectId {
  return new Types.ObjectId(objectIdString);
}
