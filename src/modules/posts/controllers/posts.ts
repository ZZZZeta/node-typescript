import { Request, Response, Router } from "express";
import { Post, postModel } from "../models/post";
import { Controller } from "../../../interfaces/controller";
import { validate, validationSchema } from "../../../utils/validate";
import httpCode from "http-status";

export default class PostsController implements Controller {
  path = "/posts";
  router = Router();
  private post = postModel;

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(`${this.path}/:id`, this.modifyPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
    this.router.post(this.path, this.createPost);
  }

  private getAllPosts = (request: Request, response: Response) => {
    this.post.find().then((posts) => {
      response.send(posts);
    });
  };

  private getPostById = (request: Request, response: Response) => {
    const id = request.params.id;
    this.post.findById(id).then((post) => {
      response.send(post);
    });
  };

  private modifyPost = (request: Request, response: Response) => {
    const id = request.params.id;
    const result = validate<Post>(validationSchema.post, { ...request.body });

    if (result.error) {
      response.status(httpCode.UNPROCESSABLE_ENTITY).json(result);
    }

    this.post
      .findByIdAndUpdate(id, result.value, { new: true })
      .then((post) => {
        response.send(post);
      });
  };

  private createPost = (request: Request, response: Response) => {
    const postData: Post = request.body;

    const result = validate<Post>(validationSchema.post, { ...request.body });

    if (result.error) {
      response.status(httpCode.UNPROCESSABLE_ENTITY).json(result);
    }

    const createdPost = new this.post(postData);
    createdPost.save().then((savedPost) => {
      response.send(savedPost);
    });
  };

  private deletePost = (request: Request, response: Response) => {
    const id = request.params.id;
    this.post.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        response.send(404);
      }
    });
  };
}
