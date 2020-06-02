import { Injectable, NotFoundException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user.entity';
import { UserDto } from '../dto/UserDto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
      ) {}

  public async validate(payload: string): Promise<User> {
    return await this.userService.findByEmail(payload);
  }

  public async register(user: UserDto): Promise<any> {
      return this.userService.create(user);
  }

  public async login(user: UserDto): Promise <any | { status: number }>{
      const userData = await this.validate(user.email);

      if (!userData) {
          return new NotFoundException;
      }

      console.log(user);
      console.log(userData);
      
      const isPasswordMatching = await bcrypt.compare(user.password, userData.password);

      if (!isPasswordMatching) {
          return new ForbiddenException('Wrong password');
      }

      const payload = `${userData.email}`;
      const accessToken = this.jwtService.sign(payload);

      return {
          expires_in: 3600,
          access_token: accessToken,
          user_id: payload,
          status: HttpStatus.OK,
      };
  }
}