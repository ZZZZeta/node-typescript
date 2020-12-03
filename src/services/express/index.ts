import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { isDevelop } from "../../config";
import Mongo, { mongoURI } from "../mongo";

export default class ExpressApp {
  app: Express;
  port: number;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeMongo(mongoURI);
  }

  private initializeMiddlewares() {
    isDevelop && this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeMongo(mongoURI: string) {
    const mongo = new Mongo(mongoURI);
    mongo.initMongo();
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`App listening on the port: ${this.port}`)
    );
  }
}
