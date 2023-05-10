import { autoInjectable, container } from "tsyringe";
import { CreateManagerUseCase } from "../../../application/manager/usecase/create-manager-use-case";
import { HttpResponse } from "../../adapters/interceptor-http";

@autoInjectable()
class controller {
  constructor(private readonly createManagerUseCase: CreateManagerUseCase) {}
  async create(data) {
    const response = await this.createManagerUseCase.execute(data);
    return new HttpResponse({
      status: 200,
      json: response,
      cookie: null,
    });
  }
}

export const managerController = container.resolve(controller);
