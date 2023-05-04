import { MessageDatabaseMemory } from "../../../infra/database/memory/message-database-memory";
import { TeamDatabaseMemory } from "../../../infra/database/memory/team-database-memory";
import { CreateNewMessageUseCase } from "./create-new-message-use-case";
import { Team } from "../../../domain/models/team-model";
import { Manager } from "../../../domain/models/manager-model";
import { ManagerDatabaseMemory } from "../../../infra/database/memory/manager-database-memory";
import { Roles } from "../../../domain/models/roles-model";

describe("create new message use case", () => {
  const messageRepo = new MessageDatabaseMemory();
  const teamRepo = new TeamDatabaseMemory();
  const managerRep = new ManagerDatabaseMemory();

  it("should create a new message at team use case", async () => {
    const roles = Roles.create("MANAGER");
    const manager = await Manager.create(
      "petrol petrol",
      "petrol@gmail.com",
      "#1234A1234",
      "00000000",
      "PF",
      roles,
      "1"
    );

    const team = Team.create("petrol", "1").addManager(manager);
    await managerRep.create(manager);
    await teamRepo.create(team);

    const service = new CreateNewMessageUseCase(
      messageRepo,
      managerRep,
      teamRepo
    );
    await service.execute({
      message: "hello-word",
      team_id: team.getId(),
      manager_id: manager.getId(),
    });
  });

  it("should return manager not found", async () => {
    try {
      const team = Team.create("petrol", "1");
      await teamRepo.create(team);

      const service = new CreateNewMessageUseCase(
        messageRepo,
        managerRep,
        teamRepo
      );
      await service.execute({
        message: "hello-word",
        team_id: "1",
        manager_id: "0",
      });
    } catch (error) {
      expect(error).toEqual(new Error("manager not found"));
    }
  });
  it("should return team not found", async () => {
    try {
      const roles = Roles.create("MANAGER");

      const manager = await Manager.create(
        "petrol petrol",
        "petrol@gmail.com",
        "#1234A1234",
        "00000000",
        "PF",
        roles,
        "1"
      );
      await managerRep.create(manager);
      const service = new CreateNewMessageUseCase(
        messageRepo,
        managerRep,
        teamRepo
      );
      await service.execute({
        message: "hello-word",
        team_id: "0",
        manager_id: "1",
      });
    } catch (error) {
      expect(error).toEqual(new Error("team not found"));
    }
  });
});
