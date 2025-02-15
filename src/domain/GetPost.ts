import { PostModel } from "../data/models/Post"
import { DomainModuleWithDeps } from "../di"
import { PostRepository } from "../data/repositories/PostRepository"

export class GetPost {
  private readonly postRepository: PostRepository

  constructor(opts: DomainModuleWithDeps) {
    this.postRepository = opts.postRepository
  }

  async execute(params: Params): Promise<Result> {
    const post = await this.postRepository.getPostById(params.id)

    return {
      post: post
    }
  }
}

type Params = {
  id: number
}

type Result = {
  post: PostModel | null
}
