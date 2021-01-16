/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { StringAndRequired } from './utils';

// ? Interfaces/Types
interface ChatDoc extends mongoose.Document {
  senderId: string;
  text: string;
}

interface ChatModel extends mongoose.Model<ChatDoc> {}

const ChatSchema = new mongoose.Schema(
  {
    senderId: StringAndRequired,
    text: StringAndRequired,
  },
  {
    timestamps: true,
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

const Chat = mongoose.model<ChatDoc, ChatModel>('Chat', ChatSchema);

export default Chat;
