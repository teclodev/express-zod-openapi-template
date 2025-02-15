import { RepositoryModuleWithDeps } from "../../di"
import { AxiosInstance } from "axios"
import { UserModel, UserResponse } from "../models/User"
import { Logger } from "../../module"

type GetUsersParams = {
  page?: number
  pageSize?: number
}

export interface UserRepository {
  getUsers(params: GetUsersParams): Promise<UserModel[]>

  getUserById(id: number): Promise<UserModel | null>
}

export class UserRepositoryImpl implements UserRepository {
  private readonly client: AxiosInstance
  private readonly logger: Logger

  constructor(opts: RepositoryModuleWithDeps) {
    this.client = opts.jsonPlaceholderClient
    this.logger = opts.logger
  }

  async getUsers(params: GetUsersParams): Promise<UserModel[]> {
    try {
      const res = await this.client.get("users", {
        params: {
          _page: params.page,
          _per_page: params.pageSize
        }
      })

      return UserResponse.array().parse(res.data)
    } catch (e) {
      if (e instanceof Error) {
        this.logger.log(e.message)
      }
      return []
    }
  }

  async getUserById(id: number): Promise<UserModel | null> {
    try {
      const res = await this.client.get(`users/${id}`)

      return UserResponse.parse(res.data)
    } catch (e) {
      if (e instanceof Error) {
        this.logger.log(e.message)
      }
      return null
    }
  }
}
