import { Manager } from "./manager-model";
import { randomUUID } from "crypto";
import { TeamAlreadyHasALeaderExceptions } from "../exceptions/team-already-has-a-leader-exceptions";
import { RoleManagerInvalidExepction } from "../exceptions/role-manager-invalid-exepction";
import { Message } from "./message-model";

export class Team {
  constructor(
    private name: string,
    private id?: string,
    private manager?: Manager,
    private messages?: Message[],
    private created_At?: Date,
    private update_At?: Date
  ) {
    this.messages = [];
  }

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
    return this;
  }

  public addNewMessage(newMessage: string, manager: Manager) {
    if (this.manager?.getId() === undefined) {
      throw new Error("i need to have a manager");
    }
    if (this.manager.getId() !== manager.getId()) {
      throw new Error("this generate does not belong to this team");
    }
    const message = Message.create(newMessage, this);
    return this.messages.push(message);
  }

  public getName() {
    return this.name;
  }
  public getManager() {
    return this.manager;
  }
  public getId() {
    return this.id;
  }
}
