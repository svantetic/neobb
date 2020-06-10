import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Segment } from '../model/segment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SegmentService {
    constructor(
        @InjectRepository(Segment)
        private repository: Repository<Segment>,
    ) {}

    async findAll(withSections = true): Promise<Segment[]> {
        const options = {
            relations: withSections ? ['sections'] : [],
        };

        return await this.repository.find(options);
    }

    async exists(segment: Segment): Promise<boolean> {
        const exists = await this.repository.find({ name: segment.name });
        return exists.length > 0;
    }

    async create(segment: Segment): Promise<Segment> {
        let newSegment = new Segment();
        newSegment = {
            ...segment,
        };

        return await this.repository.save(newSegment);
    }
}
