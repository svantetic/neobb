import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Section, Stats } from '../model/section.entity';
import { Segment } from '../model/segment.entity';
import { Repository } from 'typeorm';
import { Thread } from 'src/model/thread.entity';
import { Post } from 'src/model/post.entity';

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
        return await this.repository.findOne(id);
    }

    async findBySegment(segment: Segment): Promise<Section[]> {
        return await this.repository.find({
            select: ['id', 'description', 'latestPost', 'name', 'segment'],
            relations: ['latestPost'],
            where: {
                segment: segment,
            }
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

    async updateSectionLatestPost(thread: Thread, post: Post): Promise<Section> {
        const section: Section = await this.findById(thread.section.id);
        if (section) {
            section.latestPost = post;
            return this.repository.save(section);
        }
    }

}