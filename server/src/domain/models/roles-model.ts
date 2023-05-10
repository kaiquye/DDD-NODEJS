import { randomUUID } from "crypto";
export class Roles {
  private constructor(
    private id: string,
    private role: string,
    private created_At?: Date,
    private updated_At?: Date
  ) {}

  public static create(role: string, id?: string) {
    if (id === undefined) {
      return new Roles(randomUUID(), role);
    }
    return new Roles(id, role);
  }

  public getId() {
    return this.id;
  }
  public getRole() {
    return this.role;
  }

  public static toDomain(role) {
    return new Roles(role.id, role.role);
  }
}
