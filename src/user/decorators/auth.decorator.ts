import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { META_ROLES, RoleProtected } from "./role-protected.decorator";
import { validRoles } from '../interfaces/valid-roles';
import { AuthGuard } from "@nestjs/passport";
import { RoleUserGuard } from "../guards/role-user.guard";

export function Auth(...roles: validRoles[]) {
    return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(),RoleUserGuard)
)
}