import {
    Controller,
    Get,
    Post,
    Req,
    Res,
    BadRequestException,
    Body,
    HttpCode,
    UseGuards,
    HttpException,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { threadId } from 'worker_threads';
import { ThreadService } from 'src/services/thread.service';
import { Post as ForumPost } from 'src/model/post.entity';
@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly threadService: ThreadService,
    ) {}

    @Get()
    async root() {
        return this.postService.findAll();
    }

    @UseGuards(AuthenticatedGuard)
    @HttpCode(200)
    @Post()
    async create(
        @Body('content') content,
        @Body('threadId') threadId: string | number,
        @Req() request: Request,
    ): Promise<ForumPost | HttpException> {
        const user = request.session.passport.user;
        const thread = threadId;

        if (!thread || !user) {
            return new BadRequestException({
                message: 'No such thread or wrong user',
            });
        }

        return await this.postService.create(content, thread, user);
    }
}
