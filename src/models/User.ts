/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { StringAndRequired } from './utils';

// ? Interfaces/Types
interface UserDoc extends mongoose.Document {
  name: string;
  avatar?: string;
  googleId: string;
  status?: string;
  isAdmin: boolean;
  online: boolean;
  blockedLists: string[];
  friends: {
    friend: string;
    room: string;
  }[];
}

interface UserModel extends mongoose.Model<UserDoc> {}

const UserSchema = new mongoose.Schema(
  {
    name: StringAndRequired,
    avatar: String,
    googleId: {
      type: String,
      unique: true,
    },
    status: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    online: {
      type: Boolean,
      default: false,
    },
    blockedLists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    friends: [
      {
        friend: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        room: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Room',
        },
      },
    ],
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    // eslint-disable-next-line comma-dangle
  }
);

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default User;
