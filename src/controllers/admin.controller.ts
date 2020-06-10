import { Controller, Get, Render, Post, Body, HttpStatus, UsePipes, ConflictException, UseGuards, BadRequestException, Param, Res, Redirect } from '@nestjs/common';
import { UserDto, userSchema, adminUserSchema, AdminUserDto } from 'src/dto/UserDto';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { UserValidationPipePipe } from 'src/pipes/user-validation-pipe.pipe';
import { Response, response } from 'express';

@Controller('admin')
export class AdminController {
constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get('/login')
  // @UseGuards(AuthGuard())
  @Render('admin/login')
  adminLogin() {
    return;
  }

  @Post('login')
  @UsePipes(new UserValidationPipePipe(adminUserSchema))
  async login(@Body() user: AdminUserDto, @Res() res: Response) {
    const loggedIn = await this.authService.login(user, res, '/index');
    if (loggedIn !== true) {
      return res.redirect('/admin/login')
    }

    return res.redirect('/admin/index');
  }

  @Get('index')
  @Render('admin/index')
  adminRoot() {
    return {
      message: 'Welcome back'
    }
  }


}