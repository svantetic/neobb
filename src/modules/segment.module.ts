import { Module } from '@nestjs/common';
import { SegmentController } from '../controllers/segment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Segment } from '../model/segment.entity';
import { SegmentService } from '../services/segment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Segment])],
    controllers: [SegmentController],
    providers: [SegmentService],
    exports: [SegmentService],
})
export class SegmentModule {}
