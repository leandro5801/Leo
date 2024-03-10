import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Todo } from 'src/todo/entities/todo.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Todo]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config:ConfigService) => {
        return {
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '12h',
        }}
    }
})],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports:[JwtStrategy,PassportModule,JwtModule, TypeOrmModule]
})
export class UserModule {}
