import { Message } from "../../../domain/models/message-model";

export interface IMessagesRepository {
  create(data: Message): Promise<Message>;
  findAllByTeam(data: Message): Promise<Message>;
  findByMessage(data: Message): Promise<Message>;
}
