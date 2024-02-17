import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PaginatorDto } from 'common/dto/paginator';
import { validate as isUUID } from "uuid";
import { Todo } from 'src/todo/entities/todo.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const {todo=[], ...restDetails}= createUserDto
    const newTodo = this.userRepository.create({...restDetails,todo:todo.map(todo=>this.todoRepository.create(todo))});
    return newTodo
  }

  async findAll(paginatorDto: PaginatorDto){
    const { limit=100 , offset=0 } = paginatorDto;
    const users = await this.userRepository.find({
      relations: {todo:true},
      take: limit,
      skip: offset,
    });
    return users.map(users=>({
      ...users,
      todo:users.todo.map(({done, description}) => ({
        description:description,
        done:done
      })),
    }))
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations:{todo:true},
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.todo.map(todo=>({
      description:todo.description,
        done:todo.done
    }));
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('Error id no se encuentra');
    }
    this.userRepository.save(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('No encontrado');
    return await this.userRepository.remove(user);
  }
}
