import { domain } from "../../di";
import { Pagination } from "../../data/models/Pagination";
import { z } from "zod";
import { createRouter } from "../../app";
import { createEndpoint } from "../../domain/createEndpoint";
import { UserResponse } from "../../data/models/User";

const router = createRouter();

createEndpoint({
  router: router,
  method: "get",
  path: "/users",
  validation: {
    query: Pagination,
  },
  ok: z.object({
    users: UserResponse.array(),
  }),
  handler: async (req, res) => {
    const query = req.query;

    const getUsers = domain.cradle.getUsers;

    const result = await getUsers.execute({
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
      },
    });

    res.status(200).json({ users: result.users });
  },
});

createEndpoint({
  router: router,
  method: "get",
  path: "/users/:id",
  validation: {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
  ok: z.object({
    user: UserResponse,
  }),
  handler: async (req, res) => {
    const id = req.params.id;

    const getUser = domain.cradle.getUser;

    const result = await getUser.execute({
      id: id,
    });

    res.status(200).json({
      user: result.user,
    });
  },
});

export { router };
