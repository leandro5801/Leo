/* eslint-disable prettier/prettier */
import {
  HttpCode,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { TestingModule } from '@nestjs/testing';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatorDto } from 'common/dto/paginator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private readonly logger = new Logger('TodoService');

  async create(createTodoDto: CreateTodoDto, user:User) {
    console.log(createTodoDto);
    const {  ...restDetails } = createTodoDto;
    const newTodo = this.todoRepository.create({ ...restDetails, user: user });

    return this.todoRepository.save(newTodo);
  }

  async findAll(paginatorDto: PaginatorDto) {
    try {
    //  const { limit = 100, offset = 0 } = paginatorDto;

      const todos = await this.todoRepository.find({
        relations: { user: true },
        /*take: limit,
        skip: offset,*/
      });
      return todos.map((todos) => ({
        ...todos,
        user: todos.user.username,
      }));
    } catch (error) {
      const error1 = this.logger.error(error);
      console.log(error);
      console.log(error1);
    }
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({
      where: { id: id },
      relations: { user: true },
    });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, user:User) {
    const todo = await this.todoRepository.preload({
      id,
      ...updateTodoDto,
      user
    });

    if (!todo) {
      throw new NotFoundException('Error id no se encuentra');
    }
    this.todoRepository.save(todo);
    return todo;
  }

  async remove(id: number) {
    const todo = await this.findOne(id);
    if (!todo) throw new NotFoundException('No encontrado');
    return await this.todoRepository.remove(todo);
  }


}
