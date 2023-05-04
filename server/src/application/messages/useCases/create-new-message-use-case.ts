import "reflect-metadata";
import { UseCaseAdapter } from "../../../infra/adapters/use-case-adapter";
import { autoInjectable, inject } from "tsyringe";
import { IMessagesRepository } from "../repository/messages-repository-interface";
import { ITeamRepository } from "../../team/repository/team-repository-interface";
import { IManagerRepository } from "../../manager/repository/manager-repository-interface";

export interface ICreateNewMessageIn {
  message: string;
  team_id: string;
  manager_id: string;
}

@autoInjectable()
export class CreateNewMessageUseCase extends UseCaseAdapter<
  ICreateNewMessageIn,
  void
> {
  constructor(
    @inject("MessagesRepository")
    private readonly messageRep: IMessagesRepository,
    @inject("ManagerRepository")
    private readonly managerRep: IManagerRepository,
    @inject("TeamRepository")
    private readonly teamRep: ITeamRepository
  ) {
    super();
  }
  async execute(data: ICreateNewMessageIn): Promise<void> {
    const managerFound = await this.managerRep.findById(data.manager_id);
    if (managerFound?.getName() === undefined) {
      throw new Error("manager not found");
    }

    const teamFound = await this.teamRep.findById(data.team_id);
    if (teamFound?.getName() === undefined) {
      throw new Error("team not found");
    }

    const newMessage = teamFound.addNewMessage(data.message, managerFound);

    await this.messageRep.create(newMessage[0]);
  }
}
