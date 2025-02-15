import { Database } from "./database";
import { asClass } from "awilix";
import { NameAndRegistrationPair } from "awilix/lib/container";

export interface DataModule {
  database: Database;
}

export function getDataModule(): NameAndRegistrationPair<DataModule> {
  return {
    database: asClass(Database).singleton(),
  };
}
