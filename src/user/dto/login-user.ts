import {IsString,  Matches, MaxLength, MinLength } from "class-validator";
import { Todo } from "src/todo/entities/todo.entity";

export class LoginUserDto {
    @IsString()
    @MinLength(8)
    @MaxLength(20)
     username: string;
   
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/^(?=.*\d)(?=.*[a-záéíóúüñ])(?=.*[A-ZÁÉÍÓÚÜÑ]).*$/,{message: 'password must have a number, one character uppercase and one character lowercase'})
     password: string;
   
}