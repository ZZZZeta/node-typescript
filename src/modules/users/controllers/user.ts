import { Router, Response } from "express";
import { userModel } from "../models/user";
import httpCode from "http-status";
import { Controller } from "../../../interfaces/controller";
import { checkAuth } from "../../../services/express/middleware/checkAuth";
import { RequestWithUser } from "../../../interfaces/request";

export default class UserController implements Controller {
  public path = "/user";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/me`, checkAuth, this.getMe);
  }

  private getMe = async (req: RequestWithUser, res: Response) => {
    const user = await userModel
      .findOne({ id: req.user?.id })
      .select("-password");

    res.status(httpCode.OK).send(user);
  };
}
