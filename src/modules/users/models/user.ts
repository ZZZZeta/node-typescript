import * as mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const userModel = mongoose.model<User & mongoose.Document>(
  "User",
  userSchema
);
