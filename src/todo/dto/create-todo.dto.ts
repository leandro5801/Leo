import { IsArray, IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTodoDto {
  @IsString()
  description: string;
  @IsOptional()
  @IsBoolean()
  done: boolean;

  @IsOptional()
  @IsString()
  images:string[]
  @IsObject()
  readonly user: Partial<User>;
}
