import { autoInjectable, container } from "tsyringe";
import { HttpResponse } from "../../adapters/interceptor-http";
import { CreateEmployeeUseCase } from "../../../application/employee/usecase/create-employee-use-case";

@autoInjectable()
class controller {
  constructor(private readonly createEmployeeUseCase: CreateEmployeeUseCase) {}
  async create(data) {
    const response = await this.createEmployeeUseCase.execute(data);
    return new HttpResponse({
      status: 201,
      json: response,
      cookie: null,
    });
  }
}

export const employeeController = container.resolve(controller);
