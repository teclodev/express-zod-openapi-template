import { UserRepository, UserRepositoryImpl } from "./UserRepository"
import { asClass } from "awilix"
import { NameAndRegistrationPair } from "awilix/lib/container"
import { PostRepository, PostRepositoryImpl } from "./PostRepository"

export interface RepositoryModule {
  userRepository: UserRepository
  postRepository: PostRepository
}

export function getRepositoryModule(): NameAndRegistrationPair<RepositoryModule> {
  return {
    userRepository: asClass(UserRepositoryImpl).singleton(),
    postRepository: asClass(PostRepositoryImpl).singleton()
  }
}
