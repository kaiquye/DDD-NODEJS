import { TeamDatabaseMemory } from "../../../infra/database/memory/team-database-memory";
import { ManagerDatabaseMemory } from "../../../infra/database/memory/manager-database-memory";

describe("create-manager-use-case", function () {
  const teamRep = new TeamDatabaseMemory();
  const managerRep = new ManagerDatabaseMemory();

  it("should create a new manager and add a team", function () {
    const service = new CreateManagerAndAddInTeam(managerRep, teamRep);
  });
});
