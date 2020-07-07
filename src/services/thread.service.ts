import {
    Injectable,
    NotAcceptableException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Thread } from '../model/thread.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThreadDto } from '../controllers/thread.controller';
import { UserService } from './user.service';
import { SectionService } from './section.service';
import { Section } from 'src/model/section.entity';

@Injectable()
export class ThreadService {
    constructor(
        @InjectRepository(Thread)
        private readonly repository: Repository<Thread>,
        private readonly userService: UserService,
        private readonly sectionService: SectionService,
    ) {}
    async findBySection(sectionId: number | string): Promise<Thread[]> {
        return await this.repository.find({
            relations: ['author', 'posts'],
            select: ['id', 'name', 'createdAt', 'updatedAt'],
            where: {
                section: sectionId,
            },
            order: {
                updatedAt: 'DESC',
            },
        });
    }

    async countBySection(section: Section): Promise<number> {
        return await this.repository.count({
            where: {
                section,
            },
        });
    }

    async update(thread: Thread): Promise<Thread> {
        thread.updatedAt = new Date();
        return this.repository.save(thread);
    }

    async findOne(id: number | string): Promise<Thread> {
        return await this.repository.findOne({
            relations: ['author', 'section'],
            select: ['id', 'name', 'section', 'createdAt'],
            where: {
                id,
            },
        });
    }

    async findAll() {
        return this.repository.find();
    }

    async create(username: string, thread: ThreadDto): Promise<Thread> {
        if (!username || !thread.sectionId) {
            throw new NotAcceptableException('Thread data missing');
        }

        const author = await this.userService.findByName(username);
        const section = await this.sectionService.findById(thread.sectionId);

        if (!author || !section) {
            throw new UnprocessableEntityException(
                'Could not found section or author',
            );
        }

        const newThread = new Thread();
        newThread.name = thread.name;
        newThread.author = author;
        newThread.section = section;

        return await this.repository.save(newThread);
    }
}
