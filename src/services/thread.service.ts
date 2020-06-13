import { Injectable, NotAcceptableException, UnprocessableEntityException } from "@nestjs/common";
import { Thread } from "../model/thread.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ThreadDto } from "../controllers/thread.controller";
import { UserService } from "./user.service";
import { SectionService } from "./section.service";

@Injectable()
export class ThreadService {
    constructor(
        @InjectRepository(Thread)
        private readonly repository: Repository<Thread>,
        private readonly userService: UserService,
        private readonly sectionService: SectionService,
    ) {

    }
    async findBySection(sectionId: number | string): Promise<Thread[]> {
        return await this.repository.find({
            relations: ['author'],
            select: ['id', 'name'],
            where: {
                section: sectionId,
            }
        })
    }

    async findOne(id: number | string): Promise<Thread> {
        return await this.repository.findOne({
            relations: ['author'],
            select: ['content', 'id', 'name', 'section', 'createdAt'],
            where: {
                id,
            }
        })
    }
    // async findById(id: number | string): Promise<Thread> {
    //     return await this.repository.createQueryBuilder('thread')
    //         .leftJoin('thread.posts', 'post')
    //         .leftJoin('thread.author', 'author')
    //         .leftJoin('post.author', 'postauthor')
    //         .addSelect('post')
    //         .addSelect(['author.username', 'author.id', 'author.avatar'])
    //         .addSelect(['postauthor.username', 'postauthor.id', 'postauthor.avatar'])
    //         .where('thread.id = :id', { id })
    //         .getOne();
    // }

    async findAll() {
        return this.repository.find();
    }

    async create(username: string, thread: ThreadDto): Promise<Thread> {
        if (!username || !thread.sectionId) {
            console.log('username', username);
            console.log('thread', thread);
            throw new NotAcceptableException('Thread data missing');
        }

        const author = await this.userService.findByName(username);
        const section = await this.sectionService.findById(thread.sectionId);

        if (!author || !section) {
            throw new UnprocessableEntityException('Could not found section or author');
        }

        const newThread = new Thread();
        newThread.content = thread.content;
        newThread.name = thread.name;
        newThread.author = author;
        newThread.section = section;
        console.log('new thread to be saved', newThread);
        
        return await this.repository.save(newThread);
    }
}