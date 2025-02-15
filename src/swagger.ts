import { createDocument, ZodOpenApiOperationObject } from "zod-openapi"
import { OpenAPIObject } from "zod-openapi/dist/openapi3-ts/dist/model/openapi31"

export type OpenApiPathEntry = Record<string, ZodOpenApiOperationObject>

const openApiPaths: Record<string, OpenApiPathEntry> = {}

export function addOpenApiPath(key: string, value: OpenApiPathEntry) {
  openApiPaths[key] = value
}

export function getOpenAPISpec(): OpenAPIObject {
  return createDocument({
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0"
    },
    paths: openApiPaths
  })
}
