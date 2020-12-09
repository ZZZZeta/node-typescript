import { Router, Response, Request } from "express";
import { User, userModel } from "../../users/models/user";
import bcrypt from "bcrypt";
import httpCode from "http-status";
import { Controller } from "../../../interfaces/controller";
import { validate, validationSchema } from "../../../utils/validate";
import Token from "../logic/token";

export default class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  private user = userModel;
  private token = new Token();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/login`, this.login);
  }

  private register = async (request: Request, response: Response) => {
    const result = validate<User>(validationSchema.createUser, request.body);
    const { value: data, error } = result;

    if (error) {
      response.status(httpCode.UNPROCESSABLE_ENTITY).json(result);
    }

    if (await this.user.findOne({ email: request.body.email })) {
      response
        .status(httpCode.UNPROCESSABLE_ENTITY)
        .json("User with this email already exist");
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.user.create({
        ...data,
        password: hashedPassword,
      });
      response.send({ name: user.name, email: user.email });
    }
  };

  private login = async (request: Request, response: Response) => {
    const result = validate<User>(validationSchema.createUser, request.body);
    const { value: data } = result;

    const user = await this.user.findOne({ email: data.email });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        data.password,
        user.password
      );
      if (isPasswordMatching) {
        const token = this.token.create(user._id);
        response.send({ token });
      } else {
        response.json("Wrong password");
      }
    } else {
      response.json("No such user");
    }
  };
}
