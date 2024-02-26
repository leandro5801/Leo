import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  BadRequestException,
  HttpCode,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PaginatorDto } from 'common/dto/paginator';
import { validate as isUUID } from 'uuid';
import { Todo } from 'src/todo/entities/todo.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user';
import { JwtPayload } from './interfaces/jwt.interfaces.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    try {
      const { todo = [], password, ...restDetails } = createUserDto;
      const newTodo = this.userRepository.create({
        ...restDetails,
        password: bcrypt.hashSync(password, 10),
        todo: todo.map((todo) => this.todoRepository.create(todo)),
      });

      this.userRepository.save(newTodo);

      return {
        ...restDetails,
        todo: todo,
        token: this.getJwtToken({ id: newTodo.id }),
      };
    } catch (err) {
      console.log(err.code);

      this.handleDBErrors(err);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, username } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    console.log(user);

    if (!user)
      throw new UnauthorizedException(
        'Unauthorized user: username doesnt exist',
      );

    const auth = bcrypt.compareSync(password, user.password);
    console.log(auth);
    if (!auth)
      throw new UnauthorizedException('Unauthorized user: password incorrect');

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }
  async checkStatus(user:User){
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  };

  async findAll(paginatorDto: PaginatorDto) {
    const { limit = 100, offset = 0 } = paginatorDto;
    const users = await this.userRepository.find({
      relations: { todo: true },
      take: limit,
      skip: offset,
    });
    return users.map((users) => ({
      ...users,
      todo: users.todo.map(({ done, description }) => ({
        description: description,
        done: done,
      })),
    }));
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { todo: true },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.todo.map((todo) => ({
      description: todo.description,
      done: todo.done,
    }));
    return user;
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

  private handleDBErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    console.error(error);

    throw new InternalServerErrorException('Check server logs');
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
