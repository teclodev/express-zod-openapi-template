import { GetUser } from "./GetUser";
import { asClass } from "awilix";
import { NameAndRegistrationPair } from "awilix/lib/container";
import { GetPosts } from "./GetPosts";
import { GetPost } from "./GetPost";
import { GetUsers } from "./GetUsers";

export interface DomainModule {
  getUser: GetUser;
  getUsers: GetUsers;
  getPosts: GetPosts;
  getPost: GetPost;
}

export function getDomainModule(): NameAndRegistrationPair<DomainModule> {
  return {
    getUser: asClass(GetUser).singleton(),
    getUsers: asClass(GetUsers).singleton(),
    getPosts: asClass(GetPosts).singleton(),
    getPost: asClass(GetPost).singleton(),
  };
}
