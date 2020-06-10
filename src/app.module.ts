import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './model/post.module';
import { UserModule } from './modules/user.module';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { SegmentModule } from './modules/segment.module';
import { SectionModule } from './modules/section.module';
import { PassportModule } from '@nestjs/passport';
import { ThreadModule } from './modules/thread.module';
import * as path from 'path';
import { AdminModule } from './modules/admin.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    PostModule,
    UserModule,
    SegmentModule,
    SectionModule,
    ThreadModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
