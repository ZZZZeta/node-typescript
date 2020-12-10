import jwt from "jsonwebtoken";
import config from "../../../config";

export default class Token {
  create = (userId: string) => {
    return jwt.sign({ id: userId }, config.SESSION_SECRET, {
      algorithm: "HS256",
      expiresIn: config.AUTH.lifetime.accessToken,
    });
  };
}
