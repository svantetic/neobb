import { Controller, Get, Post, Body, HttpStatus, UseGuards, Req, Param, Render, UseFilters, Query } from '@nestjs/common';
import { ThreadService } from '../services/thread.service';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { LoginRequiredFilter } from 'src/filters/login-required.filter';
import { Request } from 'express';
import { PostService } from 'src/services/post.service';

export interface ThreadDto {
    name: string;
    content: string;
    authorEmail: string;
    sectionId: string | number;
}
@Controller('thread')
export class ThreadController {
    constructor(
        private readonly threadService: ThreadService,
        private readonly postService: PostService,
    ) {}

    
    @Get('/new')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(LoginRequiredFilter)
    @Render('client/thread/new')
    newThread(@Query('section') section: string | number) {
        return {
            section,
        }
    }


    @Get(':id')
    @Render('client/thread/index')
    async index(@Param('id') id: string | number): Promise<{ thread: any }> {
        const thread = await this.threadService.findOne(id);
        thread.posts = await this.postService.findByThread(thread);
        console.log(thread);
        return {
            thread,
        }
    }

    @Post()
    async create(@Req() request: Request, @Body() thread: ThreadDto) {        
        const threadCreated = await this.threadService.create(request.session.passport.user, thread);
        if (thread) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Thread created',
                thread: threadCreated,
            };
        }
    }
}