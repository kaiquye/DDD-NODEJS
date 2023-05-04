/**
 * @description This is a base class for future new custom error classes, it
 * serves to differentiate between internal error (unexpected) and business rule error (expected).
 */
export class CustomErrorBase extends Error {
  public status: number;
  public value?: object;
  constructor(message: string, status: number, value?: object) {
    super(message);
    this.status = status;
    this.value = value;
  }
}
