import { Team } from "../../../domain/models/team-model";

export interface ITeamRepository {
  findById(id: string): Promise<Team>;
  create(team: Team): Promise<Team>;
}
