import { InvalidNameExceptions } from "../exceptions/invalid-name-exceptions";
import { InvalidEmailException } from "../exceptions/invalid-email-exceptions";
import { InvalidPasswordException } from "../exceptions/invalid-password-exception";
import { Employee } from "./employee-model";

describe("leader domain", () => {
  it("should create a leader", async function () {
    const manager = await Employee.create(
      "Kaique Mendes",
      "kaique.mendes@gmail.com",
      "@Patati&Patata2",
      "02154026699",
      "PF"
    );

    expect(manager.getName()).toEqual("Kaique Mendes");
    expect(manager.getEmail()).toEqual("kaique.mendes@gmail.com");
    expect(manager.getDocument()).toEqual("02154026699");
    expect(manager.getRoles().getRole()).toEqual("EMPLOYEE");
  });

  it("should return email invalid", async function () {
    try {
      await Employee.create(
        "Kaique Mendes",
        "kaique.mendes",
        "@Patati&Patata2",
        "0000000000",
        "PF"
      );
    } catch (error) {
      expect(error).toEqual(new InvalidNameExceptions());
    }
  });
  it("should return document invalid", async function () {
    try {
      await Employee.create(
        "Kaique Mendes",
        "kaique.mendes",
        "@Patati&Patata2",
        "0000000000",
        "PF"
      );
    } catch (error) {
      expect(error).toEqual(new InvalidEmailException());
    }
  });
  it("should return password invalid", async function () {
    try {
      await Employee.create(
        "Kaique Mendes",
        "kaique.mendes",
        "senhainvalida",
        "0000000000",
        "PF"
      );
    } catch (error) {
      expect(error).toEqual(new InvalidPasswordException());
    }
  });
});
