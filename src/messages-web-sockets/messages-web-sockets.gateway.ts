import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWebSocketsService } from './messages-web-sockets.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../user/interfaces/jwt.interfaces.payload';

@WebSocketGateway({ cors: true, namespace: '/websocket' })
export class MessagesWebSocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;
  constructor(
    private readonly messagesWebSocketsService: MessagesWebSocketsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;
    console.log(token);

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWebSocketsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    console.log({ payload });

    // console.log(`Client connected: `+ client.id);

    // Show how many clients are connected to the server
    //   console.log({clientsConnected:this.messagesWebSocketsService.getConnectedClients()});

    // Show id off the clients
    this.wss.emit(
      'clients-updated',
      this.messagesWebSocketsService.getConnectedIdClients(),
    );
  }
  handleDisconnect(client: Socket) {
    this.messagesWebSocketsService.removeClient(client.id);
    //  console.log(`Client disconnected: ` + client.id);

    //
    this.wss.emit(
      'clients-updated',
      this.messagesWebSocketsService.getConnectedIdClients(),
    );
    //Show how many clients are connected to the server
    //  console.log({clientsConnected:this.messagesWebSocketsService.getConnectedClients()});
  }
  @SubscribeMessage('sending-message')
  handleMessage(client: Socket, payload: NewMessageDto) {
    console.log(client.id, payload);

    //! Emit only to same client(example a notification)
    // client.emit('listen-message', {fullName: 's' ,message: payload.message || 'no message'});

    // Emit to all except the client initial
    //client.broadcast.emit('listen-message', {fullName: 's' ,message: payload.message || 'no message'});

    // Emit to all
    this.wss.emit('listen-message', {
      fullName: this.messagesWebSocketsService.getUsername(client.id),
      message: payload.message || 'no message',
    });
  }

  
}
