import mongoose, { Document } from "mongoose";
import { v4 } from "uuid";

export interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  secondName: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  id: { type: String, default: v4() },
  firstName: String,
  lastName: String,
  secondName: String,
  email: String,
  password: String,
});

export const userModel = mongoose.model<User>("User", userSchema);
