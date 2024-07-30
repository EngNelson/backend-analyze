import { Module } from '@nestjs/common';
import { HtmlController } from "./html.controller";
import { HtmlService } from "./html.service";

@Module({
  imports: [],
  controllers: [HtmlController],
  providers: [HtmlService],
})
export class AppModule {}
