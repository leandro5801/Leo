import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Todo } from 'src/todo/entities/todo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Todo])], 
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
