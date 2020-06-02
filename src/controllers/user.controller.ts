import { Controller, Get, Post, Body, HttpStatus, UsePipes, ConflictException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user.entity';
import { UserValidationPipePipe } from '../pipes/user-validation-pipe.pipe';
import { UserDto, userSchema } from '../dto/UserDto';
import { AuthService } from '../services/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get()
  async root() {
    return this.userService.findAll();
  }

  @Post('login')
  @UsePipes(new UserValidationPipePipe(userSchema))
  async login(@Body() user: UserDto) {
    return this.authService.login(user);
  }

  @Post('register')
  @UsePipes(new UserValidationPipePipe(userSchema))
  async create(@Body() user: UserDto) {
    const userExists = await this.userService.emailExists(user.email);

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    this.authService.register(user);

    return {
      statusCode: HttpStatus.OK,
      message: 'User registed',
    };
  }
}