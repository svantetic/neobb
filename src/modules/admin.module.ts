import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/services/user.service';
import { UserController } from 'src/controllers/user.controller';
import { User } from 'src/model/user.entity';
import { AdminController } from 'src/controllers/admin.controller';
import { AuthService } from 'src/services/auth.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
        // TODO: remove temp key and use .env
        secret: 'temporary_key',
    }),
  ],
  controllers: [AdminController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class AdminModule {}