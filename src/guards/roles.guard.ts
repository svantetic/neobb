import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { InsufficientPermissionsException } from 'src/exceptions/InsufficientPermissionsException';
import { UserRole } from 'src/model/user.entity';
import { UserDto } from 'src/dto/UserDto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles: UserRole[] = this.reflector.get<UserRole[]>(
            'roles',
            context.getHandler(),
        );

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user: UserDto = request.user;

        if (!user || !user.role) {
            throw new InsufficientPermissionsException();
        }

        const matched: boolean = this.matchRoles(roles, user.role);

        if (!matched) {
            throw new InsufficientPermissionsException();
        }

        return true;
    }

    private matchRoles(roles: UserRole[], userRole: UserRole) {
        return roles.includes(userRole);
    }
}
