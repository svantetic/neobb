import { Controller, Get, Render } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.entity';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async root() {
    return this.postService.findAll();
  }
}
