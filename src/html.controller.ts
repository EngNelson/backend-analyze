import { Controller, Post, Body } from '@nestjs/common';
import { HtmlService } from "./html.service";

@Controller('html')
export class HtmlController {
  constructor(private readonly htmlService: HtmlService) {}

  @Post('analyze')
  async analyze(@Body('url') url: string) {
    return this.htmlService.analyzeUrl(url);
  }
}
