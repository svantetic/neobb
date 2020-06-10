import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        console.log('validate');
        
        const _user = await this.authService.validateUser({ username, password });
        console.log('user in local strategy', _user);
        
        if (!_user) {
            throw new UnauthorizedException();
        }
        return _user;
    }
}