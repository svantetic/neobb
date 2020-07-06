import { Injectable, NotFoundException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../model/user.entity';
import { UserDto, AdminUserDto, RegisterUserDto } from '../dto/UserDto';
import bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
      private readonly userService: UserService,
      ) {}

  public async validateByName(payload: string): Promise<User> {
    return await this.userService.findByName(payload);
  }

  public async register(user: RegisterUserDto): Promise<any> {
      return this.userService.create(user);
  }

  public async comparePassword(existingUser: UserDto | User, user: UserDto): Promise<any> {
    return await bcrypt.compare(existingUser.password, user.password);
  }

  public async validateUser(user: UserDto): Promise<any> {
    const existingUser = await this.validateByName(user.username);

    if (existingUser && this.comparePassword(existingUser, user)) {
      return existingUser;
    }

    return null;
  }
}