import { Manager } from "./manager-model";
import { Document } from "../value-object/document-value-object";
import { Roles } from "./roles-model";
import { Team } from "./team-model";
import { RoleManagerInvalidExepction } from "../exceptions/role-manager-invalid-exepction";
import { TeamAlreadyHasALeaderExceptions } from "../exceptions/team-already-has-a-leader-exceptions";

describe("team domain", () => {
  it("should create a new team", function () {
    const team = Team.create("Gear");
    expect(team.getName()).toEqual("Gear");
    expect(team.getManager()).toBeUndefined();
  });
  it("should add a new manager to the team", async function () {
    const roles = Roles.create("MANAGER");

    const manager = await Manager.create(
      "Kaique Mendes",
      "kaique.mendes@gmail.com",
      "@Patati&Patata2",
      "0000000000",
      "PF",
      roles
    );
    const team = Team.create("Gear");
    team.addManager(manager);
    expect(team.getManager()).toEqual(manager);
  });
  it("should return invalid role manager ", async function () {
    try {
      const roles = Roles.create("MANAGER");

      const manager = await Manager.create(
        "Kaique Mendes",
        "kaique.mendes@gmail.com",
        "@Patati&Patata2",
        "0000000000",
        "PF",
        roles
      );
      const team = Team.create("Gear");
      team.addManager(manager);
    } catch (e) {
      expect(e).toEqual(new RoleManagerInvalidExepction());
    }
  });
  it("should there is already a gender for this team", async function () {
    try {
      const roles = Roles.create("MANAGER");

      const manager = await Manager.create(
        "Kaique Mendes",
        "kaique.mendes@gmail.com",
        "@Patati&Patata2",
        "0000000000",
        "PF",
        roles
      );
      const team = Team.create("Gear");
      team.addManager(manager);
      team.addManager(manager);
    } catch (e) {
      expect(e).toEqual(new TeamAlreadyHasALeaderExceptions());
    }
  });
});
