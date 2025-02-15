import express, { Router } from "express"
import swaggerUi from "swagger-ui-express"

import { router as postsRouter } from "./controllers/posts/controller"
import { router as usersRouter } from "./controllers/users/controller"
import { getOpenAPISpec } from "./swagger"

export function createRouter() {
  return Router()
}

const app = express()

app.use(express.json())

app.use(usersRouter)
app.use(postsRouter)
app.use("/docs", swaggerUi.serve, swaggerUi.setup(getOpenAPISpec()))
app.use("/docs-json", (_, res) => {
  res.status(200).json(getOpenAPISpec())
})

export { app }
