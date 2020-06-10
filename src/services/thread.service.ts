import { Injectable, NotAcceptableException, UnprocessableEntityException } from "@nestjs/common";
import { Thread } from "../model/thread.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, InsertResult } from "typeorm";
import { ThreadDto } from "../controllers/thread.controller";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../model/user.entity";
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
            select: ['name'],
            where: {
                section: sectionId,
            }
        })
    }

    async findOne(id: number | string): Promise<Thread> {
        return await this.repository.findOne({
            relations: ['author'],
            select: ['content', 'id', 'name', 'section'],
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

    async create(user: User, thread: ThreadDto): Promise<InsertResult> {
        if (!user.email || !thread.sectionId) {
            throw new NotAcceptableException('Thread data missing');
        }

        const author = await this.userService.findByEmail(user.email);
        const section = await this.sectionService.findById(thread.sectionId);

        if (!author || !section) {
            throw new UnprocessableEntityException('Could not found section or author');
        }

        const newThread = this.repository.create();
        newThread.content = thread.content;
        newThread.name = thread.name;
        newThread.author = author;
        newThread.section = section;

        return await this.repository.insert({
            id: null,
            name: thread.name,
            content: thread.content,
            author,
            posts: [],
            section,
        });

    }
}