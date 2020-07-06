import { Injectable } from '@nestjs/common';
import { ToBeActivated } from 'src/model/tobeactivated.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(ToBeActivated)
    private repository: Repository<ToBeActivated>
  ) {}
}
