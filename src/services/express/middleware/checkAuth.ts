import jwt from "jsonwebtoken";
import { RequestWithUser } from "../../../interfaces/request";
import { Response, NextFunction } from "express";
import httpCode from "http-status";
import config from "../../../config";
import { User } from "../../../modules/users/models/user";

export const checkAuth = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.sendStatus(httpCode.UNAUTHORIZED);
  }

  try {
    req.user = <User>jwt.verify(<string>token, config.SESSION_SECRET);
    next();
  } catch {
    res.status(httpCode.UNAUTHORIZED).send("Invalid token.");
  }
};
