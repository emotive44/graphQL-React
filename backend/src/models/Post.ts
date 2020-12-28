import mongoose, { Schema, Document } from 'mongoose';


export interface IPost extends Document {
  text: string
  creator: string,
}

const postSchema: Schema<IPost> = new mongoose.Schema({
  text: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model<IPost>('Post', postSchema);