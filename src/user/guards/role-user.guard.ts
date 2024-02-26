import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entities/user.entity';
import { validRoles } from '../interfaces/valid-roles';

@Injectable()
export class RoleUserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    ) as validRoles;

    if (validRoles.length === 0) return true;
    if (!validRoles) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    console.log(user);

    if (!user) throw new ForbiddenException('You must be registered');

    for (const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }

    throw new ForbiddenException(`User ${user.username} need a valid role`);
  }
}
