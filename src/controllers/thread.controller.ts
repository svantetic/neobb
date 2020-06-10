import { Controller, Get, Post, Body, HttpStatus, UsePipes, ConflictException, UseGuards, Req, Param, Render } from '@nestjs/common';
import { ThreadService } from '../services/thread.service';
import { Thread } from '../model/thread.entity';
import { AuthGuard } from '@nestjs/passport';

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
    ) {}

    @Get(':id')
    @Render('client/thread/index')
    async findOne(@Param('id') id: string | number): Promise<{ thread: any }> {
        const thread = await this.threadService.findOne(id);
        console.log(thread);
        
        return {
            thread,
        }
    }

    @Get()
    async index() {
        const threads = await this.threadService.findAll();
        return {
            statusCode: HttpStatus.OK,
            body: {
                threads,
            }
        };
    }

    @Post()
    async create(@Req() request, @Body() thread: ThreadDto) {
        const created = await this.threadService.create(request.user, thread);
        if (created) {
            return {
                statusCode: HttpStatus.OK,
                message: 'Thread created',
            };
        }
    }
}