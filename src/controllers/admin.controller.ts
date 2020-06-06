import { Controller, Get, Render, Post, Body, HttpStatus, UsePipes, ConflictException, UseGuards, BadRequestException, Param } from '@nestjs/common';
import { UserDto, userSchema, adminUserSchema, AdminUserDto } from 'src/dto/UserDto';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { UserValidationPipePipe } from 'src/pipes/user-validation-pipe.pipe';

@Controller('admin')
export class AdminController {
constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get('/')
  // @UseGuards(AuthGuard())
  @Render('admin/index')
  adminRoot() {
    return {
      message: 'Admin area',
    }
  }

  @Post('login')
  @UsePipes(new UserValidationPipePipe(adminUserSchema))
  async login(@Body() user: AdminUserDto) {
    return this.authService.login(user);
  }
}