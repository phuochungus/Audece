import { isInstance } from 'class-validator';
import { ObjectEncodingOptions } from 'fs';
import mongoose, { ObjectId, isObjectIdOrHexString, mongo } from 'mongoose';

export function makeObjectIdArray(
  array: ObjectId[],
): mongoose.Types.ObjectId[] {
  if (!array) return [];
  return array.map((e) => {
    return new mongoose.Types.ObjectId(e.toString());
  });
}

export function makeObjectId(value: ObjectId | string) {
  if (isObjectIdOrHexString(value))
    return new mongoose.Types.ObjectId(value.toString());
  throw new Error('value is not a valid string or objectId');
}
