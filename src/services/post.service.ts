import { Injectable, NotAcceptableException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../model/post.entity';
import { Thread } from 'src/model/thread.entity';
import { User } from 'src/model/user.entity';
import { UserService } from './user.service';
import { ThreadService } from './thread.service';
import { SectionService } from './section.service';
import { Section } from 'src/model/section.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
    private readonly threadService: ThreadService,
    private readonly sectionService: SectionService,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findByThread(thread: Thread): Promise<Post[]> {
    return this.postRepository.find({
      select: ['id', 'content' ,'author', 'createdAt', 'updatedAt'],
      relations: ['author'],
      where: {
        thread: thread.id,
      },
      order: {
        createdAt: 'ASC',
      }
    })
  }

  async create(content: string, threadId: string | number, username: string): Promise<Post> {
    const author = await this.userService.findByName(username);
    const thread = await this.threadService.findOne(threadId);

    if (!author || !thread) {
      throw new UnprocessableEntityException('Could not create post. Author or thread missing');
    }

    const newPost = new Post();
    newPost.content = content;
    newPost.author = author;
    newPost.thread = thread;

    const savedPost = await this.postRepository.save(newPost);
    this.updateParentEntities(thread, savedPost);

    return savedPost;
  }

  async updateParentEntities(thread: Thread, post: Post) {
    this.threadService.update(thread);
    this.sectionService.updateSectionLatestPost(thread, post);
  }

  async findLatestByThread(thread: Thread): Promise<Post> {
    const latestPost = await this.postRepository.find({
      select: ['id', 'createdAt', 'author'],
      relations: ['author'],
      where: {
        thread: thread.id,
      },
      order: {
        createdAt: 'DESC',
      },
      take: 1,
    });

    if (latestPost.length) {
      return latestPost[0];
    }
  }

  async countBySection(section: Section): Promise<number> {
    return this.postRepository.createQueryBuilder('post')
      .leftJoin('post.thread', 'postThread')
      .select('post.id')
      .where('postThread.sectionId = :sectionId', {
        sectionId: section.id,
      })
      .getCount();
  }
}