import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/services/user.service';
import { User } from 'src/model/user.entity';
import { AdminController } from 'src/controllers/admin.controller';
import { AuthService } from 'src/services/auth.service';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule, PassportModule.register({ defaultStrategy: 'local'})
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}