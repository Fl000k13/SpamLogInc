import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { logsButtons, startingButtons } from './app.buttons';

@Injectable()
export class AppService {
  async startCommand(ctx: Context) {
    const chatId = '194088690';
    const userId = ctx.from.id;

    try {
      const chatMember = await ctx.telegram.getChatMember(chatId, userId);

      if (
        chatMember.status === 'member' ||
        chatMember.status === 'administrator'
      ) {
        await ctx.reply(`Привет, ${ctx.from.first_name}.`, startingButtons());
      } else {
        await ctx.replyWithHTML(process.env.START_TEXT);
      }
    } catch (error) {
      console.log(error);
      await ctx.replyWithHTML(
        `Произошла ошибка при проверке подписки на канал`,
      );
    }
  }

  async clickProfile(ctx: Context) {
    await ctx.reply('Твой профиль');
  }

  async clickLogs(ctx: Context) {
    await ctx.reply('Выбери соц. сеть', logsButtons());
  }

  async clickSupport(ctx: Context) {
    await ctx.reply('Системный администратор:');
    await ctx.replyWithContact('79020410729', 'Fl0k13');
  }
}
