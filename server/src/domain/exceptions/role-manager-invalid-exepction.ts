import { CustomErrorBase } from "./base/custom-error";

export class RoleManagerInvalidExepction extends CustomErrorBase {
  constructor(
    message?: "the manager does not have permission to administer a team"
  ) {
    super(message, 400);
  }
}
