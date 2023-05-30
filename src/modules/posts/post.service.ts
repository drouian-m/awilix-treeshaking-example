import { RESOLVER } from 'awilix'
import { PostRepository } from './post.repository'

class PostService {
  #postRepository: PostRepository;

  static [RESOLVER] = {}


  constructor({ postRepository }: { postRepository: PostRepository }) {
    this.#postRepository = postRepository
  }

  async list() {
    const data = await this.#postRepository.listPosts();
    return data;
  }

  async getPost(id: string) {
    const post = await this.#postRepository.getPost(id);
    return post;
  }

  async findPostsByUser(username: string) {
    const posts = await this.#postRepository.findPostsByUsername(username);
    return posts
  }
}

export { PostService }