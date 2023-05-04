import { InvalidEmailException } from "../exceptions/invalid-email-exceptions";
import { BcryptService } from "../services/bcrypt-service";
import { InvalidPasswordException } from "../exceptions/invalid-password-exception";

export class Password {
  constructor(private password: string) {}

  public static async create(password: string): Promise<string> {
    this.isValid(password);
    password = await this.generateHash(password);
    return new Password(password).getValue();
  }

  private static isValid(password: string) {
    const regexEmail = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (!password.match(regexEmail)) {
      throw new InvalidPasswordException();
    }
  }
  public static async generateHash(password: string) {
    return await new BcryptService(10).generate(password);
  }
  public async compare(hash: string) {
    return await BcryptService.compare(this.password, hash);
  }

  public getValue() {
    return this.password;
  }
}
