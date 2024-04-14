import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';

@Injectable()
export class AppService {
  async startCommand(ctx: Context) {
    const chatId = 1001896619302;
    const userId = ctx.from.id;

    try {
      const chatMember = await ctx.telegram.getChatMember(chatId, userId);

      if (
        chatMember.status === 'member' ||
        chatMember.status === 'administrator'
      ) {
        return await ctx.replyWithHTML(
          `Ты подписан на секретный канал с доступом`,
        );
      } else {
        return await ctx.replyWithHTML(process.env.START_TEXT);
      }
    } catch (error) {
      console.log(error);
      return await ctx.replyWithHTML(
        `Произошла ошибка при проверке подписки на канал`,
      );
    }
  }
}
