import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
console.log(user);

    if (!user)
      throw new InternalServerErrorException('User not found in request');
    return user ? user : user[data];
  },
);
