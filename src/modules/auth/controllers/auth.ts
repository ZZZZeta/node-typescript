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

  private register = async (req: Request, res: Response) => {
    const result = validate<User>(validationSchema.createUser, req.body);
    const { value: userData, error } = result;

    if (error) res.status(httpCode.UNPROCESSABLE_ENTITY).send(error);

    if (await this.user.findOne({ email: req.body.email })) {
      res
        .status(httpCode.UNPROCESSABLE_ENTITY)
        .send("User with this email already exist");
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await this.user.create({
        ...userData,
        password: hashedPassword,
      });

      const userWithoutPassword = await this.user
        .findOne({ email: newUser.email })
        .select("-password");

      res.send(userWithoutPassword);
    }
  };

  private login = async (req: Request, res: Response) => {
    const result = validate<User>(validationSchema.loginUser, req.body);
    const { value: loginData, error } = result;

    if (error) res.status(httpCode.UNPROCESSABLE_ENTITY).send(error);

    const user = await this.user.findOne({ email: loginData.email });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        loginData.password,
        user.password
      );
      if (isPasswordMatching) {
        const token = this.token.create(user.id);
        res.send({ token });
      } else {
        res.status(httpCode.UNPROCESSABLE_ENTITY).json("Wrong password");
      }
    } else {
      res.status(httpCode.UNPROCESSABLE_ENTITY).json("No such user");
    }
  };
}
