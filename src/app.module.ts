import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TodoModule,
    DatabaseModule,
    UserModule,
    DatabaseModule,
    FilesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port:number;
  constructor(private readonly configService:ConfigService){
    AppModule.port = +this.configService.get('PORT')
  }
}
