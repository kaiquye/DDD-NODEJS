import { IMessagesRepository } from "../../../application/messages/repository/messages-repository-interface";
import { Message } from "../../../domain/models/message-model";

export class MessageDatabaseMemory implements IMessagesRepository {
  private database: Message[];
  create(data: Message): Promise<Message> {
    return Promise.resolve(undefined);
  }

  findAllByTeam(data: Message): Promise<Message> {
    return Promise.resolve(undefined);
  }

  findByMessage(data: Message): Promise<Message> {
    return Promise.resolve(undefined);
  }
}
