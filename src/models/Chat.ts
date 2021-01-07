import mongoose from 'mongoose';

// ? Interfaces/Types
interface ChatDoc extends mongoose.Document {
  text: string;
  senderId: string;
  timestamp: Date;
}

interface ChatModel extends mongoose.Model<ChatDoc> {}

// ? Utilities
const StringAndRequired = {
  type: String,
  required: true,
};

const ChatSchema = new mongoose.Schema({
  text: StringAndRequired,
  senderId: StringAndRequired,
  timestamp: {
    type: mongoose.Schema.Types.Date,
    default: Date.now(),
  },
});

const Chat = mongoose.model<ChatDoc, ChatModel>('Chat', ChatSchema);

export default Chat;