import { Test, TestingModule } from '@nestjs/testing';
import { HtmlService } from './html.service';
import axios from 'axios';
import * as cheerio from 'cheerio';

jest.mock('axios');

describe('HtmlService', () => {
  let service: HtmlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HtmlService],
    }).compile();

    service = module.get<HtmlService>(HtmlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should analyze a URL', async () => {
    const url = 'https://example.com';
    const data = `
      <html>
        <head><title>Example Domain</title></head>
        <body>
          <h1>Example</h1>
          <a href="https://example.com/page1">Internal</a>
          <a href="https://external.com/page2">External</a>
          <form><input type="password"></form>
        </body>
      </html>
    `;
    axios.get.mockResolvedValue({ data });

    const result = await service.analyzeUrl(url);
    expect(result).toEqual({
      title: 'Example Domain',
      headings: { h1: 1, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 },
      links: { internal: 1, external: 1 },
      loginForm: true,
    });
  });
});
