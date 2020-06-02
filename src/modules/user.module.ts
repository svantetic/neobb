import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { ConfigService, ConfigModule } from 'nestjs-config';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // TODO: remove temp key and use .env
      secret: 'temporary_key',
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class UserModule {}