import { Roles } from "../../../domain/models/roles-model";

export interface IRoleRepository {
  findByName(name: string): Promise<Roles>;
}
