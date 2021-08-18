import { Schema, model } from 'mongoose';
import { User } from '../common/types';

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default model<User>('User', userSchema);
