import { Controller, Get, Render, Post, Body, BadRequestException, HttpStatus, Req, Param } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/UserDto';
import { UserService } from 'src/services/user.service';
import { UserAlreadyExistsException } from 'src/exceptions/UserAlreadyExistsException';
import { Request } from 'express';

@Controller('register')
export class RegistrationController {

  constructor(private userService: UserService) {}
  
  @Get('/')
  @Render('client/register/index')
  public show() {
    return;
  }

  @Get('/confirm/:token')
  public confirmToken(@Param('token') token: string) {
    return {
      token,
    }
  }

  // Use guard here
  @Post('/')
  public async register(@Body() user: RegisterUserDto, @Req() request: Request) {
    if (!user.email || !user.password || !user.username) {
      return new BadRequestException();
    }

    const userByUsername = await this.userService.findByName(user.username);
    const userByEmail = await this.userService.findByEmail(user.email);

    if (userByEmail || userByUsername) {
      return new UserAlreadyExistsException();
    }

    const created = await this.userService.create(user);

    if (created) {
      request.flash('userAwaiting', 'Please check your email for confirmation link');
      return {
        statusCode: HttpStatus.OK,
        message: 'User registered',
      };
    }
  }
}