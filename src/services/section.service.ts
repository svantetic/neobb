import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Section } from '../model/section.entity';
import { Segment } from '../model/segment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section)
        private repository: Repository<Section>,
        @InjectRepository(Segment)
        private segmentRepo: Repository<Segment>,
    ) {}

    async findAll(): Promise<Section[]> {
        const options = {
            relations: ['threads'],
        };
        return await this.repository.find(options);
    }

    async exists(section: Section): Promise<boolean> {
        const sections = await this.repository.find({ name: section.name });
        return sections.length > 0;
    }

    async findById(id: number | string): Promise<Section> {
        return await this.repository.findOne(id, {
            relations: ['threads'],
        });
    }

    async create(section: Section) {
        if (!section.segment) {
            throw new BadRequestException('No segment in request body');
        }

        const segment = await this.segmentRepo.findOne(section.segment);

        if (!segment) {
            throw new BadRequestException('Segment doesnt exists');
        }

        const newSection = {
            ...section,
        };

        return await this.repository.save(newSection);
    }

}