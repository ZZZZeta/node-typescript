import ExpressApp from "./services/express";
import PostsController from "./modules/posts/controllers/posts";
import AuthController from "./modules/users/controllers/auth";

const app = new ExpressApp([new PostsController(), new AuthController()], 5000);

app.listen();
