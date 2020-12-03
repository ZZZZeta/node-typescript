import mongoose from "mongoose";
import config from "../../config";

export const mongoURI =
  config.MONGO.user && config.MONGO.password
    ? `mongodb://${config.MONGO.user}:${config.MONGO.password}@${config.MONGO.host}:${config.MONGO.port}/${config.MONGO.base}`
    : `mongodb://${config.MONGO.host}:${config.MONGO.port}/${config.MONGO.base}`;

export default class Mongo {
  public mongoUrl: string;

  constructor(mongoUrl: string) {
    this.mongoUrl = mongoUrl;
  }

  public initMongo() {
    mongoose
      .connect(this.mongoUrl, { useNewUrlParser: true })
      .then(() => {
        console.log(`[mongo]: successfully connected to ${this.mongoUrl}`);
      })
      .catch((err) => {
        console.log(`mongoose connection error -  ${err}`);
        process.exit(1);
      });
  }
}
