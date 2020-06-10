import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { Post } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}