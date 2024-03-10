import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Req,
  Headers,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginatorDto } from 'common/dto/paginator';
import { LoginUserDto } from './dto/login-user';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/getUser.decorator';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { RoleUserGuard } from './guards/role-user.guard';
import { validRoles } from './interfaces/valid-roles';
import { Auth, RoleProtected } from './decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
  //Testing Authorization with token
  @Get('private1')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      user,
      headers,
    };
  }

  //Testing Authorization with token and using Roles
  @Get('private2')
  //Decorator custom for putting role metadata
  @RoleProtected(validRoles.user)
  // @SetMetadata('roles',['user','admin'])
  @UseGuards(AuthGuard(), RoleUserGuard)
  testingPrivateRoute2(@GetUser() user: User) {
    return {
      user,
    };
  }

  //Testing Authorization with decorator customizing with another decorators (@Auth)
  @Get('private3')
 @Auth(validRoles.admin)
  testingPrivateRoute3(@GetUser() user: User) {
    return {
      user,
    };
  }

  @Get('check-status')
  @Auth()
  checkStatus(@GetUser() user: User) {
    return this.userService.checkStatus(user);
  }

  @Get()
  findAll(@Query() paginatorDto: PaginatorDto) {
    return this.userService.findAll(paginatorDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
