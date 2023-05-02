import { Team } from "./team-model";
import { randomUUID } from "crypto";
import { Leader } from "./leader-model";
import { RoleLeaderInvalidExepction } from "../exceptions/role-leader-invalid-exepction";

export class Message {
  constructor(
    private id: string,
    private message: string,
    private team?: Team,
    private created_At?: string,
    private updated_At?: string
  ) {}

  public static create(
    message: string,
    team?: Team,
    leader?: Leader,
    id?: string
  ) {
    if (leader) {
      this.isValid(leader);
    }
    if (id === null) {
      return new Message(id, message, team);
    }
    return new Message(randomUUID(), message, team);
  }

  public static isValid(leader?: Leader) {
    if (leader.getRoles().getRole() !== "LEADER") {
      throw new RoleLeaderInvalidExepction();
    }
  }
}
