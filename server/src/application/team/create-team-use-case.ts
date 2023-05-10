import { UseCaseAdapter } from "../../infra/adapters/use-case-adapter";
import { autoInjectable, inject } from "tsyringe";
import { IManagerRepository } from "../manager/repository/manager-repository-interface";
import { ITeamRepository } from "./repository/team-repository-interface";
import { Team } from "../../domain/models/team-model";
import { Result } from "../../infra/http/error/custom-error";
import { ETeamCodes } from "./codes/team-codes-enum";
import { EUserCodes } from "../manager/codes/user-codes-enum";

export interface ICreateTeamIn {
  name: string;
  manager_id: string;
}

@autoInjectable()
export class CreateTeamUseCase implements UseCaseAdapter<ICreateTeamIn, void> {
  constructor(
    @inject("manager-repository")
    private readonly managerRep: IManagerRepository,
    @inject("team-repository")
    private readonly teamRep: ITeamRepository
  ) {}
  async execute(data: ICreateTeamIn): Promise<Team> {
    const managerFound = await this.managerRep.findById(data.manager_id);
    console.log(managerFound);
    if (!managerFound) {
      Result.NOT_FOUND_EXCEPTION({
        msg: "manager not found.",
        code: EUserCodes.not_found,
      });
    }

    const alreadyExists = await this.teamRep.exists(data.name);
    if (alreadyExists) {
      Result.CONFLICT_EXCEPTION({
        msg: "team already exists",
        code: ETeamCodes.already_exist,
      });
    }

    const newTeam = Team.create(data.name, managerFound);
    return await this.teamRep.create(newTeam);
  }
}
