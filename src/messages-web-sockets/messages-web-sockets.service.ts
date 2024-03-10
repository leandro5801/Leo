import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class MessagesWebSocketsService {
  private connectedClients: ConnectedClients = {};
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('Could not find');
    if (!user.isActive) throw new Error('user not active');
    this.checkUsers(user);

    this.connectedClients[client.id] = { socket: client, user: user };
  }
  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients() {
    return Object.keys(this.connectedClients).length;
  }

  getConnectedIdClients() {
    console.log('====================================');
    console.log(this.connectedClients);
    console.log('====================================');
    return Object.keys(this.connectedClients);
  }

  getUsername(socketId: string) {
    return this.connectedClients[socketId].user.username;
  }

  checkUsers(user: User) {
    for (const clientId of Object.keys(this.connectedClients)) {
      const connectedClient = this.connectedClients[clientId];
      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect();
        break;
      }
    }
  }
}
