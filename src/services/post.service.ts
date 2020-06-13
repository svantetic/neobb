import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../model/post.entity';
import { Thread } from 'src/model/thread.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    this.postRepository.find().then((posts) => console.log('posts', posts));
    return this.postRepository.find();
  }

  findByThread(thread: Thread): Promise<Post[]> {
    return this.postRepository.find({
      select: ['id'],
      where: {
        thread: thread.id,
      }
    })
  }
}