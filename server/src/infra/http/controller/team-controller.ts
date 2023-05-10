import { autoInjectable, container, inject } from "tsyringe";
import { CreateTeamUseCase } from "../../../application/team/create-team-use-case";
import { HttpResponse } from "../../adapters/interceptor-http";

@autoInjectable()
class controller {
  constructor(private readonly createTeamUseCase: CreateTeamUseCase) {}
  async create(data) {
    const response = await this.createTeamUseCase.execute(data);
    return new HttpResponse({
      status: 201,
      json: response,
      cookie: null,
    });
  }
}

export const teamController = container.resolve(controller);
