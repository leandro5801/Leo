import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { PaginatorDto } from 'common/dto/paginator';
import { Auth, GetUser } from '../user/decorators';
import { validRoles } from '../user/interfaces/valid-roles';
import { User } from '../user/entities/user.entity';


@Controller('todo')

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @Auth(validRoles.admin)
   create(@Body() createTodoDto: CreateTodoDto, @GetUser() user: User) {
    return  this.todoService.create(createTodoDto,user);
  }

  @Get()
  @Auth(validRoles.admin)
   findAll(paginatorDto:PaginatorDto){
    return  this.todoService.findAll(paginatorDto);
  }

  @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
    return  this.todoService.findOne(id);
  }

  @Patch(':id')
   update(@Param('id',ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto,@GetUser() user: User) {
    return  this.todoService.update(id, updateTodoDto,user);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return  this.todoService.remove(id);
  }
}