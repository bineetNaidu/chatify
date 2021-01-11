/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import mongoose from 'mongoose';

// ? Interfaces/Types
enum ServerVisibility {
  Public = 'public',
  Private = 'private',
}

interface ServerDoc extends mongoose.Document {
  serverName: string;
  serverAdmin: string;
  members: string[] | [];
  channels: [];
  visibility: ServerVisibility;
}

interface ServerModel extends mongoose.Model<ServerDoc> {}

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

const ServerSchema = new mongoose.Schema({
  serverName: StringRequiredAndUnique,
  serverAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },
  ],
  visibility: {
    ...StringAndRequired,
    enum: Object.values(ServerVisibility),
    default: ServerVisibility.Public,
  },
});

const Server = mongoose.model<ServerDoc, ServerModel>('Server', ServerSchema);

export default Server;
