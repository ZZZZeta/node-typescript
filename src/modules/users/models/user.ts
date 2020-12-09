import mongoose, { Document } from "mongoose";

export interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const userModel = mongoose.model<User>("User", userSchema);
