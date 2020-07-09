import {
    ExecutionContext,
    Injectable,
    CanActivate,
    ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authenticated = request.isAuthenticated();
        if (!authenticated) {
            throw new ForbiddenException();
        }

        return true;
    }
}
