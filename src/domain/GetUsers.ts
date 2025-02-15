import { UserRepository } from "../data/repositories/UserRepository"
import { DomainModuleWithDeps } from "../di"
import { UserModel } from "../data/models/User"
import { Pagination } from "../data/models/Pagination"

export class GetUsers {
  private readonly userRepository: UserRepository

  constructor(opts: DomainModuleWithDeps) {
    this.userRepository = opts.userRepository
  }

  async execute(params: Params): Promise<Result> {
    const users = await this.userRepository.getUsers({
      page: params.pagination.page,
      pageSize: params.pagination.pageSize
    })

    return {
      users: users
    }
  }
}

type Params = {
  pagination: Pagination
}

type Result = {
  users: UserModel[]
}
