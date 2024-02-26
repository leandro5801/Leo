import { SetMetadata } from '@nestjs/common';
import { validRoles } from '../interfaces/valid-roles';

export const META_ROLES = validRoles
export const RoleProtected = (...args: validRoles[]) => {
    return SetMetadata(META_ROLES, args)


};
