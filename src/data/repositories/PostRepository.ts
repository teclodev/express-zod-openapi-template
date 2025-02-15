import { PostModel, PostResponse } from "../models/Post";
import { RepositoryModuleWithDeps } from "../../di";
import { AxiosInstance } from "axios";
import { Logger } from "../../module";

type GetPostsParams = {
  page?: number;
  pageSize?: number;
};

export interface PostRepository {
  getPosts(params: GetPostsParams): Promise<PostModel[]>;

  getPostById(id: number): Promise<PostModel | null>;
}

export class PostRepositoryImpl implements PostRepository {
  private readonly client: AxiosInstance;
  private readonly logger: Logger;

  constructor(opts: RepositoryModuleWithDeps) {
    this.client = opts.jsonPlaceholderClient;
    this.logger = opts.logger;
  }

  async getPosts(params: GetPostsParams): Promise<PostModel[]> {
    try {
      const res = await this.client.get("posts", {
        params: {
          _page: params.page,
          _per_page: params.pageSize,
        },
      });

      return PostResponse.array().parse(res.data);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.log(e.message);
      }
      return [];
    }
  }

  async getPostById(id: number): Promise<PostModel | null> {
    try {
      const res = await this.client.get(`posts/${id}`);

      return PostResponse.parse(res.data);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.log(e.message);
      }
      return null;
    }
  }
}
