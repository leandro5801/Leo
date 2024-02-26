import { IsDate, IsEmail, IsOptional, IsString, IsUUID, Matches, Max, MaxLength, Min, MinLength } from "class-validator";
import { Todo } from "src/todo/entities/todo.entity";

export class CreateUserDto {
    @IsString()
    @MinLength(8)
    @MaxLength(20)
     username: string;
   
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/^(?=.*\d)(?=.*[a-záéíóúüñ])(?=.*[A-ZÁÉÍÓÚÜÑ]).*$/,{message: 'password must have a number, one character uppercase and one character lowercase'})
     password: string;
   
   
    @IsString()
    @IsEmail()
     email: string;

    @IsOptional()
   readonly todo?: Partial<Todo>[];
}
