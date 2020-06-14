import { Injectable, NotAcceptableException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../model/post.entity';
import { Thread } from 'src/model/thread.entity';
import { User } from 'src/model/user.entity';
import { UserService } from './user.service';
import { ThreadService } from './thread.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
    private readonly threadService: ThreadService,
  ) {}

  findAll(): Promise<Post[]> {
    this.postRepository.find().then((posts) => console.log('posts', posts));
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

    return await this.postRepository.save(newPost);
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
}