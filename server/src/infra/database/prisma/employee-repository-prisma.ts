import { IEmployeeRepository } from "../../../application/employee/repository/employee-repository-interface";
import { Employee } from "../../../domain/models/employee-model";
import { PrismaClient } from "@prisma/client";

export class EmployeeRepositoryPrisma implements IEmployeeRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(employee: Employee): Promise<Employee> {
    const created = await this.prisma.user.create({
      data: {
        id: employee.getId(),
        name: employee.getName(),
        email: employee.getEmail(),
        password: employee.getPassword(),
        document: employee.getDocument().getValue(),
        type: "PF",
        role_id: employee.getRoles().getId(),
      },
    });
    return Employee.toDomain(created);
  }

  exist(email: string): Promise<Employee> {
    return Promise.resolve(undefined);
  }

  findById(id: string): Promise<Employee> {
    return Promise.resolve(undefined);
  }
}
