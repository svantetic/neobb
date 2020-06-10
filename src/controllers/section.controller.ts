import { Controller, Get, Post, Body, HttpStatus, UsePipes, ConflictException, UseGuards, BadRequestException, Param } from '@nestjs/common';
import { Section } from '../model/section.entity';
import { SectionService } from '../services/section.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('section')
export class SectionController {
    constructor(private readonly service: SectionService) {}
    @Get()
    async index(): Promise<Section[]> {
        return this.service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Section> {
        return await this.service.findById(id);
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