import { Module } from '@nestjs/common';
import { ThreadController } from '../controllers/thread.controller';
import { ThreadService } from '../services/thread.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from '../model/thread.entity';
import { UserService } from '../services/user.service';
import { SectionService } from '../services/section.service';
import { Section } from '../model/section.entity';
import { User } from '../model/user.entity';
import { Segment } from '../model/segment.entity';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/model/post.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Thread, User, Section, Segment, Post]),
    ],
    controllers: [ThreadController],
    providers: [ThreadService, UserService, SectionService, PostService],
    exports: [ThreadService],
})
export class ThreadModule {}
