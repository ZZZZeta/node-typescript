import ExpressApp from "./index";
import PostsController from "./modules/posts/controllers/posts";

const app = new ExpressApp([new PostsController()], 5000);

app.listen();
