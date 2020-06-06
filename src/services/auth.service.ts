import { Injectable, NotFoundException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user.entity';
import { UserDto, AdminUserDto } from '../dto/UserDto';
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

  public async validateByName(payload: string): Promise<User> {
    return await this.userService.findByName(payload);
  }

  public async register(user: UserDto): Promise<any> {
      return this.userService.create(user);
  }

  public async login(user: UserDto | AdminUserDto): Promise <any | { status: number }>{
      let userData: {
          email?: string;
          name?: string;
          password?: string;
      } = {};
      if (user.email) {
          userData = await this.validate(user.email);
      } else if (user.name) {
          userData = await this.validateByName(user.name);
      }
      console.log(userData);
      if (!userData) {
          return new NotFoundException;
      }

      console.log(user);
      console.log(userData);
      
      const isPasswordMatching = await bcrypt.compare(user.password, userData.password);

      if (!isPasswordMatching) {
          return new ForbiddenException('Wrong password');
      }
      let payload;
      if (userData.email) {
            payload = `${userData.email}`;
      } else {
          payload = userData.name;
      }
      const accessToken = this.jwtService.sign(payload);

      return {
          expires_in: 3600,
          access_token: accessToken,
          user_id: payload,
          status: HttpStatus.OK,
      };
  }
}