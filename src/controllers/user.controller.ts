import { Controller, Get, Post, Body, HttpStatus, UsePipes, ConflictException, Res, Render, UseGuards, Req, UseFilters, Redirect } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user.entity';
import { UserValidationPipePipe } from '../pipes/user-validation-pipe.pipe';
import { UserDto, userSchema, RegisterUserDto, registerUserSchema } from '../dto/UserDto';
import { AuthService } from '../services/auth.service';
import { Response, Request } from 'express';
import { LoginGuard } from 'src/guards/login.guard';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { LoginRequiredFilter } from 'src/filters/login-required.filter';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get('login')
  @Render('client/login/index')
  loginForm(@Req() request: Request,) {
    return;
  }

  @UseGuards(LoginGuard)
  @Post('login')
  @UseFilters(new HttpExceptionFilter)
  login(@Req() request: any, @Res() response: Response): void {
    if (request.session.passport.user) {
      return response.redirect('/');
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(@Req() request: Request, @Res() response: Response): void {
    request.logout();
    return response.redirect('/');
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('users')
  @Render('client/user/index')
  @UseFilters(LoginRequiredFilter)
  async index(@Req() request: Request, @Res() response: Response) {
    let users: any = await this.userService.findAll();
    users = users.map((user) => {
      return {
        ...user,
        posts: user.posts.length,
        threads: user.threads.length,
      }
    });
    return {
      users,
      usersCount: users.length,
    }
  }
  
  // @Get()
  // async root() {
  //   return this.userService.findAll();
  // }

  // @Post('login')
  // @UsePipes(new UserValidationPipePipe(userSchema))
  // async login(@Body() user: UserDto, @Res() res: Response) {
  //   return this.authService.login(user, res, 'index');
  // }

  // @Post('register')
  // @UsePipes(new UserValidationPipePipe(registerUserSchema))
  // async create(@Body() user: RegisterUserDto) {
  //   const userExists = await this.userService.emailExists(user.email);

  //   if (userExists) {
  //     throw new ConflictException('User already exists');
  //   }

  //   this.authService.register(user);

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'User registed',
  //   };
  // }
}