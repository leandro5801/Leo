import { IsArray, IsBoolean, IsObject, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTodoDto {
  @IsString()
  description: string;
  @IsBoolean()
  done: boolean;
  @IsObject()
  readonly user: Partial<User>;
}
