import { Document } from "../value-object/document-value-object";
import { Roles } from "./roles-model";
import { randomUUID } from "crypto";
import { InvalidNameExceptions } from "../exceptions/invalid-name-exceptions";
import { InvalidEmailException } from "../exceptions/invalid-email-exceptions";
import { Password } from "../value-object/password-value-object";

export class Manager {
  private constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private document: Document,
    private roles: Roles
  ) {}

  public static async create(
    name: string,
    email: string,
    password: string,
    document: string,
    document_type: string,
    roles: Roles,
    id?: string
  ) {
    this.nameIsValid(name);
    this.emailIsValid(email);

    password = await Password.create(password);
    const newDocument = Document.create(document, document_type);

    if (id === undefined) {
      return new Manager(
        randomUUID(),
        name,
        email,
        password,
        newDocument,
        roles
      );
    }

    return new Manager(id, name, email, password, newDocument, roles);
  }

  public static nameIsValid(name: string) {
    const nameSize = name.split(" ").length;
    if (nameSize < 2) {
      throw new InvalidNameExceptions();
    }
  }

  public static emailIsValid(email: string) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      throw new InvalidEmailException();
    }
    if (!email.match(regexEmail)) {
      throw new InvalidEmailException();
    }
  }

  public getId(): string {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public getPassword() {
    return this.password;
  }
  public getEmail() {
    return this.email;
  }
  public getDocument() {
    return this.document;
  }
  public getRoles() {
    return this.roles;
  }
  public static toDomain(props) {
    return new Manager(
      props.id,
      props.name,
      props.email,
      props.password,
      props.document,
      props.roles
    );
  }
}
