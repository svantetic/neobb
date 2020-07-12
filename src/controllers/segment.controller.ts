import {
    Controller,
    Get,
    Post,
    ConflictException,
    HttpStatus,
    Body,
    UseGuards,
    BadRequestException,
} from '@nestjs/common';
import { SegmentService } from '../services/segment.service';
import { Segment } from '../model/segment.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class SegmentController {
    constructor(private readonly service: SegmentService) {}
    @Get('/segment')
    async index(): Promise<Segment[]> {
        return this.service.findAll();
    }

    @Post('/segment')
    async create(@Body() segment: Segment) {
        const segmentExists = await this.service.exists(segment);

        if (segmentExists) {
            throw new ConflictException('Segment already exists');
        }

        const created = await this.service.create(segment);

        if (!created) {
            throw new BadRequestException('Could not create segment');
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Segment created',
        };
    }
}
