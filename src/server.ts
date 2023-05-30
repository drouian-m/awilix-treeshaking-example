import http from "http";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { RESOLVER } from 'awilix';

import { PostService } from "./modules/posts/post.service";
import { UserService } from "./modules/users/user.service";


class Server {
  #app: Express;
  #server?: http.Server;
  #postService: PostService;
  #userService: UserService;

  static [RESOLVER] = {}

  constructor({ postService, userService }: { postService: PostService, userService: UserService }) {
    this.#postService = postService;
    this.#userService = userService
    this.#app = express();
  }

  bootstrap() {
    this.#app.use(cors());
    this.#app.use(express.json());
    this.#app.use(
      express.urlencoded({
        extended: false,
      }),
    );

    this.#app.get("/posts", async (req: Request, res: Response) => {
      const posts = await this.#postService.list();
      res.send(posts);
    });

    this.#app.get("/posts/:postId", async (req: Request, res: Response) => {
      const post = await this.#postService.getPost(req.params.postId);
      res.send(post);
    });

    this.#app.get("/users/:userId/posts", async (req: Request, res: Response) => {
      const posts = await this.#userService.getUserPosts(req.params.userId);
      res.send(posts);
    });

    this.#server = http.createServer(this.#app);

    return this.#app;
  }

  run() {
    this.#server?.listen(8080);
    console.log("🚀 server started and available on http://localhost:8080");
  }

  shutdown() {
    this.#server?.close(() => {
      console.log("HTTP server closed");
    });
  }
}

export { Server }