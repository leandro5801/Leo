import { IsNumber, IsOptional, IsPositive } from "class-validator"

export class PaginatorDto{
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit?:number

    @IsNumber()
    @IsOptional()
    offset?:number
}