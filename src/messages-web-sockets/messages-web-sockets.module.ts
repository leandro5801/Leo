import { Module } from '@nestjs/common';
import { MessagesWebSocketsService } from './messages-web-sockets.service';
import { MessagesWebSocketsGateway } from './messages-web-sockets.gateway';
import { UserModule } from '../user/user.module';

@Module({
  imports:[UserModule],
  providers: [MessagesWebSocketsGateway, MessagesWebSocketsService],
})
export class MessagesWebSocketsModule {}
