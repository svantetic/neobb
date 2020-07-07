import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { Post } from './post.entity';
import { ThreadService } from 'src/services/thread.service';
import { UserService } from 'src/services/user.service';
import { Thread } from './thread.entity';
import { SectionService } from 'src/services/section.service';
import { User } from './user.entity';
import { Section } from './section.entity';
import { Segment } from './segment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post, Thread, User, Section, Segment])],
    providers: [PostService, ThreadService, UserService, SectionService],
    controllers: [PostController],
    exports: [PostService],
})
export class PostModule {}
