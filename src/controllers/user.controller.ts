import {
    Controller,
    Get,
    Post,
    Body,
    HttpStatus,
    UsePipes,
    ConflictException,
    Res,
    Render,
    UseGuards,
    Req,
    UseFilters,
    Redirect,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user.entity';
import { UserValidationPipePipe } from '../pipes/user-validation-pipe.pipe';
import {
    UserDto,
    userSchema,
    RegisterUserDto,
    registerUserSchema,
} from '../dto/UserDto';
import { AuthService } from '../services/auth.service';
import { Response, Request } from 'express';
import { LoginGuard } from 'src/guards/login.guard';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { LoginRequiredFilter } from 'src/filters/login-required.filter';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Get('login')
    @Render('client/login/index')
    loginForm(@Req() request: Request) {
        return;
    }

    @UseGuards(LoginGuard)
    @Post('login')
    @UseFilters(new HttpExceptionFilter())
    login(@Req() request: any, @Res() response: Response): void {
        if (request.session.passport.user) {
            const redirect = new String(
                request.session.redirect ? request.session.redirect : '/',
            );
            request.session.redirect = '';
            return response.redirect(redirect.toString());
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
        users = users.map(user => {
            return {
                ...user,
                posts: user.posts.length,
                threads: user.threads.length,
            };
        });
        return {
            users,
            usersCount: users.length,
        };
    }

    @Get('profile')
    @Render('client/user/profile')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(LoginRequiredFilter)
    async myProfile(@Req() request: Request) {
        return;
    }

    @Get('user/:user')
    @Render('client/user/profile')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(LoginRequiredFilter)
    async profile(@Req() request: Request) {
        return;
    }
}
