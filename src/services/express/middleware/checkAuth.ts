import jwt from "jsonwebtoken";
import { RequestWithUser } from "../../../interfaces/request";
import { Response, NextFunction } from "express";
import httpCode from "http-status";
import config from "../../../config";

export const checkAuth = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(httpCode.UNAUTHORIZED);

  try {
    req.user = jwt.verify(token, config.SESSION_SECRET);
    next();
  } catch {
    res.status(httpCode.BAD_REQUEST).send("Invalid token.");
  }
};
