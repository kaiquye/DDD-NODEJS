import "reflect-metadata";
import { UseCaseAdapter } from "../../../infra/adapters/use-case-adapter";
import { Employee } from "../../../domain/models/employee-model";
import { ITeamRepository } from "../../team/repository/team-repository-interface";
import { inject } from "tsyringe";
import { IManagerRepository } from "../../manager/repository/manager-repository-interface";
import { IEmployeeRepository } from "../repository/employee-repository-interface";
import { Roles } from "../../../domain/models/roles-model";

export interface ICreateEmployeeIn {
  manager_id: string;
  employee: Employee;
  team_id: string;
}
export class CreateEmployeeUseCase
  implements UseCaseAdapter<ICreateEmployeeIn, void>
{
  constructor(
    @inject("EmployeeRepository")
    private readonly employeeRepository: IEmployeeRepository,
    @inject("ManagerRepository")
    private readonly managerRep: IManagerRepository,
    @inject("TeamRepository")
    private readonly teamRep: ITeamRepository
  ) {}
  async execute(data: ICreateEmployeeIn): Promise<void> {
    const managerFound = await this.managerRep.findById(data.manager_id);
    if (managerFound?.getId() === undefined) {
      throw new Error("manager not found");
    }

    const teamFound = await this.teamRep.findById(data.team_id);
    if (teamFound?.getId() === undefined) {
      throw new Error("team not found");
    }

    const alreadyExists = await this.employeeRepository.exist(
      data.employee.getEmail()
    );
    if (alreadyExists?.getName()) {
      throw new Error("email already exist");
    }

    const newEmployee = await Employee.create(
      data.employee.getName(),
      data.employee.getEmail(),
      data.employee.getPassword(),
      data.employee.getDocument().getValue(),
      "PF",
      Roles.create("EMPLOYEE"),
      managerFound
    );

    await this.employeeRepository.create(newEmployee);
  }
}
