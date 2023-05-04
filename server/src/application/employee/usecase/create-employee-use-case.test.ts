import { TeamDatabaseMemory } from "../../../infra/database/memory/team-database-memory";
import { ManagerDatabaseMemory } from "../../../infra/database/memory/manager-database-memory";
import { EmployeeDatabaeMemory } from "../../../infra/database/memory/employee-databae-memory";
import { Manager } from "../../../domain/models/manager-model";
import { Employee } from "../../../domain/models/employee-model";
import { Roles } from "../../../domain/models/roles-model";
import { CreateEmployeeUseCase } from "./create-employee-use-case";
import { Team } from "../../../domain/models/team-model";

describe("create-employee-use-case", function () {
  const teamRep = new TeamDatabaseMemory();
  const employeeRep = new EmployeeDatabaeMemory();
  const managerRep = new ManagerDatabaseMemory();

  it("should create a new employee and add a team", async function () {
    const manager = await Manager.create(
      "petrol petrol",
      "petrol@gmail.com",
      "#112@asSads",
      "00000000",
      "PF",
      Roles.create("MANAGER"),
      "1"
    );
    const employee = await Employee.create(
      "petrolino petrolino",
      "petrolino@gmail.com",
      "#112@asSads",
      "000000",
      "PF",
      Roles.create("EMPLOYEE")
    );
    const team = await Team.create("TEAM_PETROL");
    managerRep.create(manager);
    teamRep.create(team);
    const service = new CreateEmployeeUseCase(employeeRep, managerRep, teamRep);
    await service.execute({
      manager_id: manager.getId(),
      employee: employee,
      team_id: team.getId(),
    });
  });
  it("should return manager not found", async function () {
    try {
      const employee = await Employee.create(
        "petrolino petrolino",
        "petrolino@gmail.com",
        "#112@asSads",
        "000000",
        "PF",
        Roles.create("EMPLOYEE")
      );
      const team = await Team.create("TEAM_PETROL");
      teamRep.create(team);
      const service = new CreateEmployeeUseCase(
        employeeRep,
        managerRep,
        teamRep
      );
      await service.execute({
        manager_id: "0",
        employee: employee,
        team_id: team.getId(),
      });
    } catch (error) {
      expect(error).toEqual(new Error("manager not found"));
    }
  });
});
