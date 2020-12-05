import { Router, Response, Request } from "express";
import { User, userModel } from "../models/user";
import bcrypt from "bcrypt";
import httpCode from "http-status";
import { Controller } from "../../../interfaces/controller";
import { validate, validationSchema } from "../../../utils/validate";

export default class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
    this.router.post(`${this.path}/login`, this.loggingIn);
  }

  private registration = async (request: Request, response: Response) => {
    const result = validate<User>(validationSchema.createUser, request.body);

    if (result.error) {
      response.status(httpCode.UNPROCESSABLE_ENTITY).json(result);
    }

    if (await this.user.findOne({ email: request.body.email })) {
      response
        .status(httpCode.UNPROCESSABLE_ENTITY)
        .json("User with this email already exist");
    } else {
      const hashedPassword = await bcrypt.hash(result.value.password, 10);
      const user = await this.user.create({
        ...result.value,
        password: hashedPassword,
      });
      response.send({ name: user.name, email: user.email });
    }
  };

  private loggingIn = async (request: Request, response: Response) => {
    const result = validate<User>(validationSchema.createUser, request.body);

    const user = await this.user.findOne({ email: result.value.email });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        result.value.password,
        user.password
      );
      if (isPasswordMatching) {
        response.send({ name: user.name, email: user.email });
      } else {
        response.json("Wrong password");
      }
    } else {
      response.json("No such user");
    }
  };
}
