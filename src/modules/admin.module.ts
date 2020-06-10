import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/services/user.service';
import { User } from 'src/model/user.entity';
import { AdminController } from 'src/controllers/admin.controller';
import { AuthService } from 'src/services/auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AdminController],
  providers: [UserService, AuthService],
})
export class AdminModule {}