import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  private readonly forumName: string = 'NeoBB';
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('client/index/index')
  root() {
    return {
      message: 'Witam na forum',
      forumName: this.forumName,
    };
  }

  @Get('terms')
  @Render('client/terms/index')
  terms() {
    return;
  }

  @Get('users')
  @Render('client/users/index')
  users() {
    return;
  }

  @Get('admin')
  // @UseGuards(AuthGuard())
  @Render('admin/index')
  adminRoot() {
    return {
      message: 'Admin area',
      forumName: this.forumName,
    }
  }
  
}
