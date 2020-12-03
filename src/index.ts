import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

export default class ExpressApp {
  app: Express;
  port: number;

  constructor(controllers: any[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`App listening on the port: ${this.port}`)
    );
  }
}
