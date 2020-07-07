import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserNotActivatedException } from 'src/exceptions/UserNotActivatedException';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const _user = await this.authService.validateUser({
            username,
            password,
            role: null,
        });

        if (!_user) {
            throw new UnauthorizedException();
        }

        if (!_user.active) {
            throw new UserNotActivatedException();
        }
        return _user;
    }
}
