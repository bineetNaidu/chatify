import mongoose from 'mongoose';
import { StringAndRequired } from './utils';

// ? Interfaces/Types
interface UserDoc extends mongoose.Document {
  name: string;
  googleId: string;
  status?: string;
  isAdmin: boolean;
  online: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {}

const UserSchema = new mongoose.Schema({
  name: StringAndRequired,
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
});

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default User;
