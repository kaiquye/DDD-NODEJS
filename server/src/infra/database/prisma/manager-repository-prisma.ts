import { IManagerRepository } from "../../../application/manager/repository/manager-repository-interface";
import { Manager } from "../../../domain/models/manager-model";
import { PrismaClient } from "@prisma/client";
import { Team } from "../../../domain/models/team-model";

export class ManagerRepositoryPrisma implements IManagerRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(manager: Manager): Promise<Manager> {
    const created = await this.prisma.user.create({
      data: {
        id: manager.getId(),
        name: manager.getName(),
        email: manager.getEmail(),
        password: manager.getPassword(),
        document: manager.getDocument().getValue(),
        type: "PF",
        role_id: manager.getRoles().getId(),
      },
    });
    return Manager.toDomain(created);
  }

  async exists(email: string): Promise<Manager> {
    const manager = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (manager) {
      return Manager.toDomain(manager);
    }
    return null;
  }

  async findById(id: string): Promise<Manager> {
    const manager = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (manager) {
      return Manager.toDomain(manager);
    }

    return null;
  }
}
