import { Controller, Get, Render, UseGuards, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { SegmentService } from './services/segment.service';
import { Section, Stats } from './model/section.entity';
import { ThreadService } from './services/thread.service';
import { PostService } from './services/post.service';
import { Response } from 'express';

@Controller()
export class AppController {
    private readonly forumName: string = 'NeoBB';
    constructor(
        private readonly appService: AppService,
        private readonly segmentService: SegmentService,
        private readonly threadService: ThreadService,
        private readonly postService: PostService,
    ) {}

    @Get()
    @Get('index')
    @Render('client/index/index')
    async root(@Res() res: Response) {
        const segments = await this.segmentService.findAll();
        for (const segment of segments) {
            for (const section of segment.sections) {
                // TOOD: Move this to DTO?
                (section as Section & Stats).stats = {
                    threads: await this.threadService.countBySection(section),
                    posts: await this.postService.countBySection(section),
                };
            }
        }
        return {
            message: 'Witam na forum',
            forumName: this.forumName,
            segments,
        };
    }

    @Get('terms')
    @Render('client/terms/index')
    terms() {
        return;
    }

    @Get('search')
    @Render('client/search/index')
    search() {
        return;
    }
}
