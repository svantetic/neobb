import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService, InjectConfig } from 'nestjs-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, @InjectConfig() private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO: remove temp key and use .env
      secretOrKey: 'temporary_key',
    });
  }

  async validate(payload: string) {
    // // const user = await this.authService.validateUser(payload);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}