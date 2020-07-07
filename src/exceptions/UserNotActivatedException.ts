import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotActivatedException extends HttpException {
    constructor() {
        super('User not activated', HttpStatus.EXPECTATION_FAILED);
    }
}
