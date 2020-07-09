import {
    Controller,
    Get,
    Render,
    Post,
    Body,
    HttpStatus,
    UsePipes,
    ConflictException,
    UseGuards,
    BadRequestException,
    Param,
    Res,
    Redirect,
    Request,
    UseFilters,
    HttpException,
} from '@nestjs/common';
import {
    UserDto,
    userSchema,
    adminUserSchema,
    AdminUserDto,
} from 'src/dto/UserDto';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { UserValidationPipePipe } from 'src/pipes/user-validation-pipe.pipe';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LoginGuard } from 'src/guards/login.guard';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { InsufficientPermissionsException } from 'src/exceptions/InsufficientPermissionsException';
import { PermissionsFilter } from 'src/filters/permissions.filter';
import { UserRole, User, UserPromotionResponse } from 'src/model/user.entity';
import { LoginRequiredFilter } from 'src/filters/login-required.filter';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}
    // @Roles(UserRole.ADMIN)
    // @UseGuards(AuthenticatedGuard, RolesGuard)
    // @UseFilters(PermissionsFilter, LoginRequiredFilter)
    @Get('/')
    @Render('admin/index')
    adminRoot() {
        return {
            message: 'Welcome back',
        };
    }

    @Get('/logout')
    logout(@Request() req, @Res() response: Response) {
        req.logout();
        return response.redirect('/');
    }
    // @Roles(UserRole.ADMIN)
    // @UseGuards(RolesGuard)
    // @UseFilters(PermissionsFilter)
    @Get('/users')
    async users(): Promise<{ users: User[] }> {
        const users = await this.userService.findAll([
            'id',
            'username',
            'role',
            'createdAt',
            'updatedAt',
            'active',
        ]);

        return {
            users,
        };
    }

    @Post('/user/promote')
    async promote(
        @Body() user: User,
    ): Promise<{ message: string; user: UserPromotionResponse }> {
        if (!user || !user.username || !user.id || !user.role) {
            throw new BadRequestException('Bad request');
        }
        const { id, role } = await this.userService.promoteUser(user);
        return {
            message: 'User promoted',
            user: {
                id,
                role,
            },
        };
    }
}
