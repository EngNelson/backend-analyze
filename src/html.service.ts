import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class HtmlService {
  async analyzeUrl(url: string) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      const $ = cheerio.load(response.data);

      const title = $('title').text();
      const headings = {};
      for (let i = 1; i <= 6; i++) {
        headings[`h${i}`] = $(`h${i}`).length;
      }

      const links = {
        internal: 0,
        external: 0,
      };
      const domain = new URL(url).hostname;
      $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        if (href.includes(domain)) {
          links.internal++;
        } else {
          links.external++;
        }
      });

      const loginForm = $('form').filter((_, element) => {
        const form = $(element);
        return form.find('input[type=password]').length > 0;
      }).length > 0;

      return { title, headings, links, loginForm };
    } catch (error) {
      console.log('URL Processing Error => ', error?.message);
      throw new HttpException(`Error caught while analyzing URL,${error?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
