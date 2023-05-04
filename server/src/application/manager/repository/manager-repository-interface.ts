import { Manager } from "../../../domain/models/manager-model";

export interface IManagerRepository {
  create(manager: Manager): Promise<Manager>;
  findById(id: string): Promise<Manager>;
}
