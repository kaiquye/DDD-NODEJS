import { CustomErrorBase } from "./base/custom-error";

export class InvalidPasswordException extends CustomErrorBase {
  constructor(
    message?: "password type and invalidate. must contain alpha numbers."
  ) {
    super(message, 400);
  }
}
