import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsArray, IsBoolean, IsString } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsString()
    description:string;
    @IsBoolean()
    done:boolean
    @IsArray()
    @IsString({each:true})
    images:string[]
}