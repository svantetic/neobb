import { Injectable, NotFoundException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../model/user.entity';
import { UserDto, AdminUserDto } from '../dto/UserDto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

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

  public async login(user: UserDto, res: Response, destination: string): Promise<boolean | ForbiddenException> {
      const userData = await this.validateByName(user.name);
      console.log('userdata', userData);
      
      if (!userData) {
        return new ForbiddenException('Wrong user');
          
      }

      console.log('is password matching');

      
      const isPasswordMatching = await bcrypt.compare(user.password, userData.password);

      if (!isPasswordMatching) {
          return new ForbiddenException('Wrong password');
      }

      return true;
    }
}