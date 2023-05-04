import { CustomErrorBase } from "./base/custom-error";

export class TeamAlreadyHasALeaderExceptions extends CustomErrorBase {
  constructor(message?: "this team already has a manager assigned.") {
    super(message, 409);
  }
}
