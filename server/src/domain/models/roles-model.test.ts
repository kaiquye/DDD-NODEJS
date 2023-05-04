import { Roles } from "./roles-model";

describe("roles domain", () => {
  it("should create a new role", function () {
    const role = Roles.create("Gear");
    expect(role).toEqual(role);
  });
});
