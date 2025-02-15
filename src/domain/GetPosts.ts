import { DomainModuleWithDeps } from "../di";
import { PostRepository } from "../data/repositories/PostRepository";
import { Pagination } from "../data/models/Pagination";
import { PostModel } from "../data/models/Post";

export class GetPosts {
  private readonly postRepository: PostRepository;

  constructor(opts: DomainModuleWithDeps) {
    this.postRepository = opts.postRepository;
  }

  async execute(params: Params): Promise<Result> {
    const posts = await this.postRepository.getPosts({
      page: params.pagination.page,
      pageSize: params.pagination.pageSize,
    });

    return {
      posts,
    };
  }
}

type Params = {
  pagination: Pagination;
};

type Result = {
  posts: PostModel[];
};
