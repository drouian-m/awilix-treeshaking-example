import { RESOLVER } from 'awilix'

type Post = {
  id: string,
  name: string,
  description: string,
  username: string,
}

class PostRepository {
  #posts: Post[]

  static [RESOLVER] = {}

  constructor() {
    this.#posts = [{
      id: '1',
      name: 'foo',
      description: 'foo',
      username: 'doe-j'
    }, {
      id: '2',
      name: 'bar',
      description: 'bar',
      username: 'unicorn'
    }]
  }

  listPosts() {
    return this.#posts;
  }

  getPost(id: string) {
    const post = this.#posts.find(p => p.id === id);
    return post;
  }

  findPostsByUsername(username: string) {
    const posts = this.#posts.find(p => p.username === username);
    return posts;
  }
}

export { PostRepository }