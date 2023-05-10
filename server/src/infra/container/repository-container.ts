import { container } from "tsyringe";
import { MessageDatabaseMemory } from "../database/memory/message-database-memory";
import { TeamRepositoryPrisma } from "../database/prisma/team-repository-prisma";
import { RoleRepositoryPrisma } from "../database/prisma/role-repository-prisma";
import { ManagerRepositoryPrisma } from "../database/prisma/manager-repository-prisma";
import { EmployeeRepositoryPrisma } from "../database/prisma/employee-repository-prisma";

container.registerSingleton("employee-repository", EmployeeRepositoryPrisma);
container.registerSingleton("message-repository", MessageDatabaseMemory);
container.registerSingleton("manager-repository", ManagerRepositoryPrisma);
container.registerSingleton("team-repository", TeamRepositoryPrisma);
container.registerSingleton("role-repository", RoleRepositoryPrisma);
