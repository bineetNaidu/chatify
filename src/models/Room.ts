/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { StringAndRequired } from './utils';

// ? Interfaces/Types
interface RoomDoc extends mongoose.Document {
  roomName: string;
  roomAvatar: string;
  roomStatus: string;
  master: string;
  invitee: string;
  chats: string[];
}

interface RoomModel extends mongoose.Model<RoomDoc> {}

const RoomSchema = new mongoose.Schema(
  {
    roomName: StringAndRequired,
    roomAvatar: String,
    roomStatus: String,
    master: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    invitee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
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

const Room = mongoose.model<RoomDoc, RoomModel>('Room', RoomSchema);

export default Room;
