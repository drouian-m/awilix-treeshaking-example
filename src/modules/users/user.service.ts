import { RESOLVER } from 'awilix'
import { PostService } from "../posts/post.service";

class UserService {
  #postService: PostService;

  static [RESOLVER] = {}

  constructor({ postService }: { postService: PostService }) {
    this.#postService = postService
  }

  getUserPosts(username: string) {
    const posts = this.#postService.findPostsByUser(username);
    return posts;
  }
}

export { UserService }