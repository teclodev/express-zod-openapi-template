import { Client } from "./Client"
import { asClass, asValue } from "awilix"
import { NameAndRegistrationPair } from "awilix/lib/container"
import axios, { AxiosInstance } from "axios"

export interface ClientModule {
  client: Client
  jsonPlaceholderClient: AxiosInstance
}

function getJsonPlaceholderClient() {
  return axios.create({
    baseURL: process.env.JSON_PLACEHOLDER_URL
  })
}

export function getClientModule(): NameAndRegistrationPair<ClientModule> {
  return {
    client: asClass(Client).singleton(),
    jsonPlaceholderClient: asValue(getJsonPlaceholderClient())
  }
}
