import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { Message } from 'src/messages/entities/message.entity';
import { Answer } from 'src/messages/entities/answer.entity';

@Injectable()
export class SocketService {
  connectedUsers: Map<string, Socket>;
  server;

  constructor(private userService: UsersService) {
    this.connectedUsers = new Map();
  }

  signServer(server) {
    this.server = server;
  }

  handleConnection(client: Socket, data: any) {
    const { userId } = data;
    if (!userId) return;
    this.connectedUsers.set(userId, client);
  }

  handleDisconnection(client: Socket) {
    this.connectedUsers.delete(client.id);
  }

  async handleNewMessageSent(messageSent: Message | Answer) {
    const { from } = messageSent;
    const user = await this.userService.findOne(from.id);
    this.server.emit(`answerAdded`, { ...messageSent, from: user });
  }
}
