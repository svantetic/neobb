import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientPermissionsException extends HttpException {
  constructor() {
    super('Insufficient permissions', HttpStatus.EXPECTATION_FAILED);
  }
}