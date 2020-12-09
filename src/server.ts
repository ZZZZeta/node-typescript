import ExpressApp from "./services/express";
import PostsController from "./modules/posts/controllers/posts";
import AuthController from "./modules/auth/controllers/auth";
import UserController from "./modules/users/controllers/user";

const app = new ExpressApp(
  [new PostsController(), new AuthController(), new UserController()],
  5000
);

app.listen();
