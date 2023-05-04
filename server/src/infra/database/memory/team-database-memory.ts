import { Team } from "../../../domain/models/team-model";
import { ITeamRepository } from "../../../application/team/repository/team-repository-interface";
import * as timers from "timers";

export class TeamDatabaseMemory implements ITeamRepository {
  private database: Team[];
  constructor() {
    this.database = [];
  }

  async findById(id: string): Promise<Team> {
    return this.database.find((team) => team.getId() === id);
  }

  async create(team: Team): Promise<Team> {
    this.database.push(team);
    return team;
  }
}
