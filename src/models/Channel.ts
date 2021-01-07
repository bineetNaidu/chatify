import mongoose from 'mongoose';

// ? Interfaces/Types
interface User {
  name: string;
  email: string;
  googleId: string;
  status?: string;
  isAdmin: boolean;
}

interface ChannelDoc extends mongoose.Document {
  serverId: string;
  channelName: string;
  channelAdmin: User;
  invitee: User;
  chats: [];
  channelAvatar: string;
}

interface ChannelModel extends mongoose.Model<ChannelDoc> {}

// ? Utilities
const StringAndRequired = {
  type: String,
  required: true,
};

const StringRequiredAndUnique = {
  type: String,
  required: true,
  unique: true,
};

const channelSchema = new mongoose.Schema({
  serverId: StringAndRequired,
  channelName: StringRequiredAndUnique,
  channelAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
  channelAvatar: String,
});

const Channel = mongoose.model<ChannelDoc, ChannelModel>(
  'Channel',
  // eslint-disable-next-line comma-dangle
  channelSchema
);

export default Channel;
