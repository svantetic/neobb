import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { SegmentService } from './services/segment.service';

@Controller()
export class AppController {
  private readonly forumName: string = 'NeoBB';
  constructor(private readonly appService: AppService,
    private readonly segmentService: SegmentService) {}

  @Get()
  @Render('client/index/index')
  async root() {
    const segments = await this.segmentService.findAll();
    console.log('segments');
    console.log(segments[0].sections[0]);
    
    
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
}
