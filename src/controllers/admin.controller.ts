import { Controller, Get, Render, Post, Body, HttpStatus, UsePipes, ConflictException, UseGuards, BadRequestException, Param, Res, Redirect } from '@nestjs/common';
import { UserDto, userSchema, adminUserSchema, AdminUserDto } from 'src/dto/UserDto';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { UserValidationPipePipe } from 'src/pipes/user-validation-pipe.pipe';
import { Response, response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LoginGuard } from 'src/guards/login.guard';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Controller('admin')
export class AdminController {
constructor(private readonly authService: AuthService) {}

  @Get('/login')
  // @UseGuards(AuthGuard())
  @Render('admin/login')
  adminLogin() {
    return;
  }

  @UseGuards(LoginGuard)
  @Post('login')
  @UsePipes(new UserValidationPipePipe(adminUserSchema))
  async login(@Body() user: AdminUserDto, @Res() res: Response) {
    const loggedIn = await this.authService.validateUser(user);
    if (loggedIn !== true) {
      return res.redirect('/admin/login')
    }

    return res.redirect('/admin/index');
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('/')
  @Render('admin/index')
  adminRoot() {
    return {
      message: 'Welcome back'
    }
  }


}