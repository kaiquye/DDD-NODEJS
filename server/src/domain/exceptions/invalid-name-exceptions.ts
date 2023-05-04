import { CustomErrorBase } from "./base/custom-error";

export class InvalidNameExceptions extends CustomErrorBase {
  constructor(
    messsage?: "The name informed is not valid, it must have a name and a surname."
  ) {
    super(messsage, 400);
  }
}
