import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from '../model/section.entity';
import { SectionController } from '../controllers/section.controller';
import { SectionService } from '../services/section.service';
import { Segment } from '../model/segment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section, Segment]),
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}