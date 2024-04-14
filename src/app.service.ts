import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';

@Injectable()
export class AppService {
  async startCommand(ctx: Context) {
    await ctx.replyWithHTML(process.env.START_TEXT);
  }
}
