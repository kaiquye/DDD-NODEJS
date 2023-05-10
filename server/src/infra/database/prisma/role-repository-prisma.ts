import { IRoleRepository } from "../../../application/role/repository/role-repository-interface";
import { PrismaClient } from "@prisma/client";
import { Roles } from "../../../domain/models/roles-model";

export class RoleRepositoryPrisma implements IRoleRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async findByName(name: string): Promise<Roles> {
    const role = await this.prisma.role.findFirst({
      where: {
        role: name,
      },
    });

    if (role) {
      return Roles.toDomain(role);
    }

    return null;
  }
}
