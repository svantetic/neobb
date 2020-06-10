import { Controller, Get, Post, Body, HttpStatus, UsePipes, ConflictException, Res, Render, UseGuards, Req, UseFilters } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user.entity';
import { UserValidationPipePipe } from '../pipes/user-validation-pipe.pipe';
import { UserDto, userSchema, RegisterUserDto, registerUserSchema } from '../dto/UserDto';
import { AuthService } from '../services/auth.service';
import { Response, Request } from 'express';
import { LoginGuard } from 'src/guards/login.guard';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get('login')
  @Render('client/login/index')
  loginForm(@Req() request: Request,) {
    return { 
      flashMessage: request.flash('loginError') 
    };
  }

  @UseGuards(LoginGuard)
  @Post('login')
  @UseFilters(new HttpExceptionFilter)
  login(@Req() request: any, @Res() response: Response): void {
    if (request.session.passport.user) {
      return response.redirect('/');
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