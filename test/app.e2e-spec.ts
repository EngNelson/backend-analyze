import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as cheerio from 'cheerio';
import { HtmlService } from 'src/html.service';


describe('HtmlService', () => {
  let service: HtmlService;
  let mock: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HtmlService],
    }).compile();

    service = module.get<HtmlService>(HtmlService);
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should analyze URL and return results', async () => {
    const url = 'http://example.com';
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Example Page</title>
        </head>
        <body>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <a href="http://example.com/internal">Internal Link</a>
          <a href="http://external.com">External Link</a>
          <form>
            <input type="password" />
          </form>
        </body>
      </html>
    `;

    mock.onGet(url).reply(200, htmlContent);

    const result = await service.analyzeUrl(url);

    expect(result).toEqual({
      title: 'Example Page',
      headings: { h1: 1, h2: 1, h3: 0, h4: 0, h5: 0, h6: 0 },
      links: { internal: 1, external: 1 },
      loginForm: true,
    });
  });

  it('should throw HttpException when URL processing fails', async () => {
    const url = 'http://example.com';
    mock.onGet(url).networkError();

    await expect(service.analyzeUrl(url)).rejects.toThrow(HttpException);
    await expect(service.analyzeUrl(url)).rejects.toEqual(
      new HttpException(
        'Error caught while analyzing URL,Network Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  });
});
