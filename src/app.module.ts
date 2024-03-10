import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';
import { MessagesWebSocketsModule } from './messages-web-sockets/messages-web-sockets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TodoModule,
    DatabaseModule,
    UserModule,
    DatabaseModule,
    FilesModule,
    MessagesWebSocketsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
 
}
