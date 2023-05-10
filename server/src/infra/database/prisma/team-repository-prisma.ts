import { ITeamRepository } from "../../../application/team/repository/team-repository-interface";
import { Team } from "../../../domain/models/team-model";
import { PrismaClient } from "@prisma/client";

export class TeamRepositoryPrisma implements ITeamRepository {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async addManager(team: Team): Promise<Team> {
    console.log(team.getManager().getId());
    await this.prisma.team.update({
      where: { id: team.getId() },
      data: {
        managerId: team.getManager().getId(),
      },
    });

    return team;
  }

  async create(team: Team): Promise<Team> {
    await this.prisma.team.create({
      data: {
        name: team.getName(),
        managerId: team.getManager().getId(),
      },
    });
    return team;
  }

  async exists(name: string): Promise<Team> {
    const team = await this.prisma.team.findFirst({
      where: {
        name,
      },
    });
    if (team) {
      return Team.toDomain(team);
    }
    return null;
  }

  async findById(id: string): Promise<Team> {
    const team = await this.prisma.team.findUnique({
      where: { id: id },
    });
    if (team) {
      return Team.toDomain(team);
    }
    return null;
  }
}
