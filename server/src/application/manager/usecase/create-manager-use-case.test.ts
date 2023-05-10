import { TeamDatabaseMemory } from "../../../infra/database/memory/team-database-memory";
import { ManagerDatabaseMemory } from "../../../infra/database/memory/manager-database-memory";
import { CreateNewMessageUseCase } from "../../messages/useCases/create-new-message-use-case";
import { CreateManagerUseCase } from "./create-manager-use-case";
import { Manager } from "../../../domain/models/manager-model";
import { Team } from "../../../domain/models/team-model";

describe("create-manager-use-case", function () {
  const teamRep = new TeamDatabaseMemory();
  const managerRep = new ManagerDatabaseMemory();

  it("should create a new manager and add a team", async function () {
    const team = Team.create("petrol", "1");
    teamRep.create(team);
    const service = new CreateManagerUseCase(managerRep, teamRep);
    await service.execute({
      document: "00000",
      password: "@asdaD#dasd12",
      document_type: "PF",
      name: "Kaique Mendes Silva",
      email: "petrol@gmail.com",
      team_id: team.getId(),
    });
  });
});
