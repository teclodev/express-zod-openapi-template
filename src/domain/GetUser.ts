import { UserRepository } from "../data/repositories/UserRepository";
import { DomainModuleWithDeps } from "../di";
import { UserModel } from "../data/models/User";

export class GetUser {
  private readonly userRepository: UserRepository;

  constructor(opts: DomainModuleWithDeps) {
    this.userRepository = opts.userRepository;
  }

  async execute(params: Params): Promise<Result> {
    const user = await this.userRepository.getUserById(params.id);

    return {
      user: user,
    };
  }
}

type Params = {
  id: number;
};

type Result = {
  user: UserModel | null;
};
