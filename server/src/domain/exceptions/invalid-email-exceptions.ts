import { CustomErrorBase } from "./base/custom-error";

export class InvalidEmailException extends CustomErrorBase {
  constructor(message?: "The email entered is not valid.") {
    super(message, 400);
  }
}
