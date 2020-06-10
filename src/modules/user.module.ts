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
import { LocalStrategy } from 'src/strategy/local.strategy';
@Module({
  imports: [
    ConfigModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, LocalStrategy],
  exports: [UserService]
})
export class UserModule {}