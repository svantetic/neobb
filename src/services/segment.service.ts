import { Injectable, NotFoundException, Logger } from '@nestjs/common';
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
            relations: withSections
                ? [
                      'sections',
                      'sections.latestPost',
                      'sections.latestPost.author',
                  ]
                : [],
            orderBy: {
                'section.createdAt': 'DESC',
            },
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

    async delete(segment: Segment): Promise<Segment> {
        try {
            const exists = await this.exists(segment);

            if (!exists) {
                throw new NotFoundException('Segment does not exists');
            }
            return await this.repository.remove(segment);
        } catch (error) {
            Logger.log(error);
        }
    }

    async update(id: number, name: string): Promise<boolean> {
        const updated = await this.repository.update(
            {
                id,
            },
            {
                name,
            },
        );

        return updated.affected > 0;
    }
}
