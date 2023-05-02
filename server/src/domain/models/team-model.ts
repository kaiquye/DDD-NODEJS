import { Manager } from "./manager-model";
import { randomUUID } from "crypto";
import { TeamAlreadyHasALeaderExceptions } from "../exceptions/team-already-has-a-leader-exceptions";
import { RoleManagerInvalidExepction } from "../exceptions/role-manager-invalid-exepction";

export class Team {
  constructor(
    private name: string,
    private id?: string,
    private manager?: Manager,
    private created_At?: Date,
    private update_At?: Date
  ) {}

  public static create(name: string, id?: string) {
    if (id === undefined) {
      return new Team(name, randomUUID());
    }
    return new Team(name, id);
  }

  public addManager(manager: Manager) {
    if (manager.getRoles().getRole() !== "MANAGER") {
      throw new RoleManagerInvalidExepction();
    }
    if (this.manager?.getId()) {
      throw new TeamAlreadyHasALeaderExceptions();
    }

    this.manager = manager;
  }

  public getName() {
    return this.name;
  }
  public getManager() {
    return this.manager;
  }
}
