import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';


export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  comparePassword(password: string): boolean;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (err) {
    console.log(err);
  }
  next();
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);