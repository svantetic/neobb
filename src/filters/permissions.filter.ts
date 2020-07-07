import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InsufficientPermissionsException } from 'src/exceptions/InsufficientPermissionsException';

@Catch(HttpException)
export class PermissionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        if (exception instanceof InsufficientPermissionsException) {
            request.flash(exception.message, exception.message);
            response.redirect('/index');
        }
    }
}
