import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from '../model/section.entity';
import { SectionController } from '../controllers/section.controller';
import { SectionService } from '../services/section.service';
import { Segment } from '../model/segment.entity';
import { ThreadService } from 'src/services/thread.service';
import { UserService } from 'src/services/user.service';
import { Thread } from 'src/model/thread.entity';
import { User } from 'src/model/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, Segment, Thread, User]),
  ],
  controllers: [SectionController],
  providers: [SectionService, ThreadService, UserService],
})
export class SectionModule {}