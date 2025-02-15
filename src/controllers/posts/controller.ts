import { Pagination } from "../../data/models/Pagination";
import { domain } from "../../di";
import { z } from "zod";
import { createRouter } from "../../app";
import { createEndpoint } from "../../domain/createEndpoint";
import { PostResponse } from "../../data/models/Post";

const router = createRouter();

createEndpoint({
  router: router,
  method: "get",
  path: "/posts",
  validation: {
    query: Pagination,
  },
  ok: z.object({
    posts: PostResponse.array(),
  }),
  handler: async (req, res) => {
    const getPosts = domain.cradle.getPosts;

    const query = req.query;

    const result = await getPosts.execute({
      pagination: query,
    });

    res.status(200).json({ posts: result.posts });
  },
});

createEndpoint({
  router: router,
  path: "/posts/:id",
  method: "get",
  validation: {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
  ok: z.object({
    post: PostResponse,
  }),
  handler: async (req, res) => {
    const id = req.params.id;
    const getPost = domain.cradle.getPost;

    const result = await getPost.execute({
      id: id,
    });

    res.status(200).json({ post: result.post });
  },
});

export { router };
