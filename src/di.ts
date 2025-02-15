import { DataModule, getDataModule } from "./data/datasources/module";
import { ClientModule, getClientModule } from "./data/clients/module";
import {
  getRepositoryModule,
  RepositoryModule,
} from "./data/repositories/module";
import { DomainModule, getDomainModule } from "./domain/module";
import { AppModule, getAppModule } from "./module";
import { AwilixContainer, createContainer } from "awilix";

export type RepositoryModuleWithDeps = ClientModule &
  AppModule &
  DataModule &
  RepositoryModule;
export type DomainModuleWithDeps = AppModule & RepositoryModule & DomainModule;

function setupDI(): {
  domain: AwilixContainer<DomainModule>;
} {
  const base = createContainer<
    AppModule & ClientModule & DataModule & RepositoryModule & DomainModule
  >();

  base.register({
    ...getAppModule(),
    ...getDataModule(),
    ...getClientModule(),
    ...getRepositoryModule(),
    ...getDomainModule(),
  });

  return {
    domain: base,
  };
}

const { domain } = setupDI();

export { domain };
