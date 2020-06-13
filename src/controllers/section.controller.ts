import { Controller, Get, Post, Body, HttpStatus, UsePipes, ConflictException, UseGuards, BadRequestException, Param, Render } from '@nestjs/common';
import { Section } from '../model/section.entity';
import { SectionService } from '../services/section.service';
import { AuthGuard } from '@nestjs/passport';
import { ThreadService } from 'src/services/thread.service';

@Controller('section')
export class SectionController {
    constructor(private readonly service: SectionService, private readonly threadService: ThreadService) {}
    @Get()
    async index(): Promise<Section[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @Render('client/section/index')
    async findOne(@Param('id') id): Promise<any> {
        const section = await this.service.findById(id);
        let threads: any = await this.threadService.findBySection(section.id);
        threads = threads.map((thread) => {
            return {
                ...thread,
                posts: thread.posts.length,
            }
        });

        return {
            section,
            threads,
        }
    }

    @Post()

    async create(@Body() section: Section) {
        const sectionExists = await this.service.exists(section);

        if (sectionExists) {
            throw new ConflictException('Section already exists');
        }

        const created = await this.service.create(section);
        
        if (!created) {
            throw new BadRequestException('Could not create section');
        }
        
        return {
            statusCode: HttpStatus.OK,
            message: 'Section created',
        };

    }
}