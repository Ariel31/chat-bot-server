import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from './socket.service';
import { Message } from 'src/messages/entities/message.entity';

@WebSocketGateway(8080, { cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  connectedUsers: Map<string, Socket>;

  constructor(private readonly socketService: SocketService) {
    this.connectedUsers = new Map();
  }

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    console.log('disconnecting');
    this.socketService.handleDisconnection(client);
  }

  handleConnection(client: Socket) {
    console.log('connected', client.id);
  }

  @SubscribeMessage('identity')
  identity(@ConnectedSocket() client: Socket, @MessageBody() data) {
    this.socketService.handleConnection(client, data);
  }

  @SubscribeMessage('sendMessage')
  create(@MessageBody() messageSent: Message) {
    this.socketService.handleNewMessageSent(messageSent);
  }

  afterInit(server: Server) {
    this.socketService.signServer(server);
  }
}
