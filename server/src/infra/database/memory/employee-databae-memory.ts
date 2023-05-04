import { Employee } from "../../../domain/models/employee-model";
import { IEmployeeRepository } from "../../../application/employee/repository/employee-repository-interface";

export class EmployeeDatabaeMemory implements IEmployeeRepository {
  private database: Employee[];

  constructor() {
    this.database = [];
  }

  async create(employee: Employee): Promise<Employee> {
    this.database.push(employee);
    return employee;
  }

  async findById(id: string): Promise<Employee> {
    return this.database.find((employee) => employee.getId() === id);
  }
}
