import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/model/user.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
