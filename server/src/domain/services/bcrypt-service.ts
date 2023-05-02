import * as bcrypt from "bcrypt";

export class BcryptService {
  constructor(private salt: number) {}
  public async generate(password: string) {
    const salt = await bcrypt.genSalt(this.salt);
    return bcrypt.hashSync(password, salt);
  }
  public static async compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
