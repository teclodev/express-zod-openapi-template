import { asClass } from "awilix"
import { NameAndRegistrationPair } from "awilix/lib/container"

export class Logger {
  log(message: string) {
    console.log(message)
  }
}

export interface AppModule {
  logger: Logger
}

export function getAppModule(): NameAndRegistrationPair<AppModule> {
  return {
    logger: asClass(Logger).singleton()
  }
}
