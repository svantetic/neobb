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
import { UserRole } from 'src/model/user.entity';

@Controller('admin')
export class AdminController {
    constructor(private readonly authService: AuthService) {}
    @Roles(UserRole.ADMIN)
    @UseGuards(AuthenticatedGuard, RolesGuard)
    @UseFilters(PermissionsFilter)
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
}
