import { IManagerRepository } from "../../../application/manager/repository/manager-repository-interface";
import { Manager } from "../../../domain/models/manager-model";

export class ManagerDatabaseMemory implements IManagerRepository {
  private database: Manager[];

  constructor() {
    this.database = [];
  }

  async create(manager: Manager): Promise<Manager> {
    console.log(manager);
    this.database.push(manager);
    return manager;
  }

  async findById(id: string): Promise<Manager> {
    return this.database.find((manager) => manager.getId() === id);
  }
}
