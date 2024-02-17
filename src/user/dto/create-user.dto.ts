import { IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { Todo } from "src/todo/entities/todo.entity";

export class CreateUserDto {
    @IsString()
    @Min(2)
    @Max(20)
    username: string;
    
    @IsUUID()
    password:string;

    @IsOptional()
   readonly todo?: Partial<Todo>[];
}
