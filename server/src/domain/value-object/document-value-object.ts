import { ValidateCpfServices } from "../services/validate-cpf-services";

export class Document {
  constructor(private number: string) {}

  public static create(document: string, type: string) {
    this.isValid(document, type);
    return new Document(document);
  }

  private static isValid(number: string, type: string): void {
    if (
      process.env?.environment !== "HML" ||
      process.env?.environment === undefined
    ) {
      return null;
    }
    if (type === "PF") {
      return new ValidateCpfServices().execute(number);
    }
    throw new Error("type document not implement.");
  }

  public getValue() {
    return this.number;
  }
}
