import "reflect-metadata";
import { UseCaseAdapter } from "../../../infra/adapters/use-case-adapter";
import { Employee } from "../../../domain/models/employee-model";
import { ITeamRepository } from "../../team/repository/team-repository-interface";
import { autoInjectable, inject } from "tsyringe";
import { IManagerRepository } from "../../manager/repository/manager-repository-interface";
import { IEmployeeRepository } from "../repository/employee-repository-interface";
import { Roles } from "../../../domain/models/roles-model";
import { IRoleRepository } from "../../role/repository/role-repository-interface";
import { Result } from "../../../infra/http/error/custom-error";
import { EUserCodes } from "../../manager/codes/user-codes-enum";
import { ETeamCodes } from "../../team/codes/team-codes-enum";

export interface ICreateEmployeeIn {
  manager_id: string;
  employee: Employee;
  team_id: string;
}

@autoInjectable()
export class CreateEmployeeUseCase
  implements UseCaseAdapter<ICreateEmployeeIn, void>
{
  constructor(
    @inject("employee-repository")
    private readonly employeeRepository: IEmployeeRepository,
    @inject("manager-repository")
    private readonly managerRep: IManagerRepository,
    @inject("team-repository")
    private readonly teamRep: ITeamRepository,
    @inject("role-repository")
    private readonly roleRep: IRoleRepository
  ) {}
  async execute(data: ICreateEmployeeIn): Promise<Employee> {
    const fetchEmployeeRole = await this.roleRep.findByName("MANAGER");
    const managerFound = await this.managerRep.findById(data.manager_id);
    if (managerFound?.getId() === undefined) {
      Result.NOT_FOUND_EXCEPTION({
        msg: "manager not found",
        code: EUserCodes.not_found,
      });
    }

    const teamFound = await this.teamRep.findById(data.team_id);
    console.log(teamFound);
    if (teamFound?.getId() === undefined) {
      Result.NOT_FOUND_EXCEPTION({
        msg: "team not found",
        code: ETeamCodes.not_found,
      });
    }

    const alreadyExists = await this.employeeRepository.exist(
      data.employee.getEmail()
    );
    if (alreadyExists?.getName()) {
      Result.CONFLICT_EXCEPTION({
        msg: "user already exists",
        code: EUserCodes.already_exist,
      });
    }

    const newEmployee = await Employee.create(
      data.employee.getName(),
      data.employee.getEmail(),
      data.employee.getPassword(),
      data.employee.getDocument().getValue(),
      "PF",
      fetchEmployeeRole,
      managerFound
    );

    return await this.employeeRepository.create(newEmployee);
  }
}
