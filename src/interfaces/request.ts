import { Request } from "express";
import { User } from "../modules/users/models/user";

export interface RequestWithUser extends Request {
  user?: User;
}
