import * as mongoose from "mongoose";
import { Document } from "mongoose";

export interface Post extends Document {
  author: string;
  content: string;
  title: string;
}

const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  title: String,
});

export const postModel = mongoose.model<Post>("Post", postSchema);
