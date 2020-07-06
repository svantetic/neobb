import {
    Controller,
    Get,
    Render,
    Post,
    Body,
    BadRequestException,
    HttpStatus,
    Req,
    Param,
    Query,
    HttpException,
    Res,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/UserDto';
import { UserService } from 'src/services/user.service';
import { UserAlreadyExistsException } from 'src/exceptions/UserAlreadyExistsException';
import { Request, response, request, Response } from 'express';
import { RegistrationService } from 'src/services/registration.service';
import { exception } from 'console';
import { User } from 'src/model/user.entity';
import { ToBeActivated } from 'src/model/tobeactivated.entity';

@Controller('register')
export class RegistrationController {
    constructor(
        private userService: UserService,
        private registrationService: RegistrationService,
    ) {}

    @Get('/')
    @Render('client/register/index')
    public show() {
        return;
    }

    @Get('/activate')
    public async confirmToken(
        @Query('token') token: string,
        @Req() request: Request,
        @Res() response: Response,
    ) {
        const valid = await this.registrationService.validateToken(token);
        
        if (valid === false) {
            throw new HttpException('Invalid token', 404);
        }

        else if (valid) {
            const user = await this.userService.activateUser((valid as ToBeActivated).user);
            this.registrationService.delete(valid);
            request.flash('userActivated', `User account ${user.username} activated successfully`);
            return response.redirect('/');
        }

        request.flash('activationError', `No such token.`);
        return response.redirect('/');
    }

    // Use guard here
    @Post('/')
    public async register(
        @Body() user: RegisterUserDto,
        @Req() request: Request,
    ) {
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
            this.registrationService.createToBeActivatedUser(created);
            request.flash(
                'userAwaiting',
                `Please check your email ${user.email} for confirmation link`,
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'User registered',
            };
        }
    }
}
