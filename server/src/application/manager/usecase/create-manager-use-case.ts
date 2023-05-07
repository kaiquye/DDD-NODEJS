import "reflect-metadata";
import { UseCaseAdapter } from "../../../infra/adapters/use-case-adapter";
import { ITeamRepository } from "../../team/repository/team-repository-interface";
import { autoInjectable, inject } from "tsyringe";
import { IManagerRepository } from "../repository/manager-repository-interface";
import { Manager } from "../../../domain/models/manager-model";
import { IRoleRepository } from "../../role/repository/role-repository-interface";
import { Result } from "../../../infra/http/error/custom-error";
import { EUserCodes } from "../codes/user-codes-enum";
import { ETeamCodes } from "../../team/codes/team-codes-enum";

export interface ICreateManagerIn {
  name: string;
  email: string;
  password: string;
  document: string;
  document_type: string;
  team_id: string;
}

@autoInjectable()
export class CreateManagerUseCase
  implements UseCaseAdapter<ICreateManagerIn, void>
{
  constructor(
    @inject("manager-repository")
    private readonly managerRep: IManagerRepository,
    @inject("team-repository")
    private readonly teamRep: ITeamRepository,
    @inject("role-repository")
    private readonly roleRep: IRoleRepository
  ) {}
  async execute(data: ICreateManagerIn): Promise<Manager> {
    const fetchManagerRole = await this.roleRep.findByName("MANAGER");
    const alreadyExists = await this.managerRep.exists(data.email);
    if (alreadyExists) {
      Result.CONFLICT_EXCEPTION({
        msg: "user already exists",
        code: EUserCodes.already_exist,
      });
    }

    const teamFound = await this.teamRep.findById(data.team_id);
    if (!teamFound) {
      Result.NOT_FOUND_EXCEPTION({
        msg: "team not found",
        code: ETeamCodes.not_found,
      });
    }

    const newManager = await Manager.create(
      data.name,
      data.email,
      data.password,
      data.document,
      data.document_type,
      fetchManagerRole
    );

    const created = await this.managerRep.create(newManager);
    teamFound.addManager(newManager);
    await this.teamRep.addManager(teamFound);

    return created;
  }
}
