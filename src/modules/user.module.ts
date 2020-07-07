import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { RegistrationController } from 'src/controllers/registration.controller';
import { ToBeActivated } from 'src/model/tobeactivated.entity';
import { RegistrationService } from 'src/services/registration.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([User, ToBeActivated]),
        PassportModule.register({ defaultStrategy: 'local' }),
    ],
    controllers: [UserController, RegistrationController],
    providers: [UserService, RegistrationService, AuthService, LocalStrategy],
    exports: [UserService],
})
export class UserModule {}
