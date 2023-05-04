import { CustomErrorBase } from "./base/custom-error";

export class RoleLeaderInvalidExepction extends CustomErrorBase {
  constructor(
    message?: "the leader does not have permission to administer a team"
  ) {
    super(message, 400);
  }
}
