import { Manager } from "./manager-model";
import { Leader } from "./leader-model";

describe("leader domain", () => {
  it("should create a leader", async function () {
    const manager = await Manager.create(
      "Kaique Mendes",
      "kaique.mendes@gmail.com",
      "@Patati&Patata2",
      "0000000000", // random
      "PF"
    );
    const leader = await Leader.create(
      "Ze Mendes",
      "ze.mendes@gmail.com",
      "@ZePatati&Ze2",
      "0000000000", // random
      "PF",
      manager
    );

    expect(leader.getName()).toEqual("Ze Mendes");
    expect(leader.getEmail()).toEqual("ze.mendes@gmail.com");
    expect(leader.getRoles().getRole()).toEqual("LEADER");
  });
});
