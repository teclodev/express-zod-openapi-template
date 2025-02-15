/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRouter } from "../app";
import { RequestHandler } from "express";
import { z, ZodError, ZodObject, ZodSchema } from "zod";
import { ZodOpenApiOperationObject } from "zod-openapi";
import { addOpenApiPath, OpenApiPathEntry } from "../swagger";
import { ZodOpenApiParameters } from "zod-openapi/dist/create/document";

type CreateEndpointParams<
  Params extends ZodObject<any> = any,
  Body extends ZodObject<any> = any,
  Query extends ZodObject<any> = any,
> = {
  router: ReturnType<typeof createRouter>;
  method: "get" | "post" | "put" | "delete";
  path: string;
  validation?: {
    params?: Params;
    body?: Body;
    query?: Query;
  };
  ok?: ZodSchema;
  handler: RequestHandler<z.infer<Params>, any, z.infer<Body>, z.infer<Query>>;
};

export function createEndpoint<
  Params extends ZodObject<any> = any,
  Body extends ZodObject<any> = any,
  Query extends ZodObject<any> = any,
>(params: CreateEndpointParams<Params, Body, Query>) {
  const { router, method, path, validation } = params;

  const operationId = `${method}_${path.replace(/\//g, "_")}`;

  const openApiPathEntry: OpenApiPathEntry = {};

  const openApiParams: ZodOpenApiParameters = {};

  router[method](
    path,
    (req, res, next) => {
      const {
        params: _params,
        body: _body,
        query: _query,
      } = params.validation ?? {};

      const errors: ZodError[] = [];

      if (_params) {
        const safe = _params.safeParse(req.params);
        if (!safe.success) {
          errors.push(safe.error);
        }
      }

      if (_body) {
        const safe = _body.safeParse(req.body);
        if (!safe.success) {
          errors.push(safe.error);
        }
      }

      if (_query) {
        const safe = _query.safeParse(req.query);
        if (!safe.success) {
          errors.push(safe.error);
        }
      }

      if (errors.length > 0) {
        res.status(400).send(errors.map((error) => ({ errors: error.errors })));
        return;
      }

      return next();
    },
    params.handler,
  );

  const operation: ZodOpenApiOperationObject = {
    responses: {
      200: {
        content: {
          "application/json": {
            schema: params.ok ?? z.any(),
          },
        },
      },
    },
  };

  if (validation?.params) {
    openApiParams.path = validation.params;
  }

  if (validation?.query) {
    openApiParams.query = validation.query;
  }

  operation.requestParams = openApiParams;

  if (validation?.body) {
    operation.requestBody = {
      content: {
        "application/json": {
          schema: validation.body,
        },
      },
    };
  }

  openApiPathEntry[method] = {
    operationId: operationId,
    ...operation,
  };

  addOpenApiPath(path, openApiPathEntry);
}
