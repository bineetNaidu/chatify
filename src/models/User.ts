import mongoose from 'mongoose';

// ? Interfaces/Types
interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  googleId: string;
  status?: string;
  isAdmin: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {}

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

const UserSchema = new mongoose.Schema({
  name: StringAndRequired,
  email: {
    ...StringRequiredAndUnique,
    lowercase: true,
  },
  googleId: StringRequiredAndUnique,
  status: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default User;
