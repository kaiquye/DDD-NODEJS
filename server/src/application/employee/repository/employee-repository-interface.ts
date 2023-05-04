import { Employee } from "../../../domain/models/employee-model";

export interface IEmployeeRepository {
  create(data: Employee): Promise<Employee>;
  findById(id: string): Promise<Employee>;
  exist(email: string): Promise<Employee>;
}
