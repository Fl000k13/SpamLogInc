import { Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import {
  cityButtons,
  cityGUButtons,
  logsButtons,
  sexButtons,
  sexFAButtons,
  startingButtons,
} from './app.buttons';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
    @InjectRepository(Account)
    private readonly accountEntity: Repository<Account>,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}
  async startCommand(ctx: Context) {
    try {
      console.log(ctx.from.id);
      const user = await this.userEntity.findOne({
        where: { id: ctx.from.id },
      });
      console.log(user);

      await ctx.reply(`Привет, ${ctx.from.first_name}.`, startingButtons());
      // } else {
      //   await ctx.reply(
      //     'Привет, это хранилище аккаунтов Spam Zone. Перед началом работы обратитесь к системному администратору, для предоставления доступа к платформе.' +
      //       'Ежедневные лимиты: Vk - 5шт. Tg - 5шт (не считая замены).',
      //   );
      // }
    } catch (error) {
      console.log(error);
      await ctx.reply(
        'Привет, это хранилище аккаунтов Spam Zone. Перед началом работы обратитесь к системному администратору, для предоставления доступа к платформе.',
      );
    }
  }

  async clickProfile(ctx: Context) {
    const name = ctx.from.first_name;
    const user = await this.userEntity.findOne({
      where: { id: ctx.from.id },
    });
    console.log(user);
    await ctx.replyWithHTML(
      `<b>Имя: ${name}</b> \n<b>Номер сотрудника: ${user.number}</b> \n<b>Взято аккаунтов: ${user.monthlylogs}</b> \n<b>Возвратов: ${user.monthlyreturns}</b>`,
    );
  }

  async clickLogs(ctx: Context) {
    await ctx.reply('Выбери соц. сеть', logsButtons());
  }

  async clickSupport(ctx: Context) {
    await ctx.reply('Системный администратор:');
    await ctx.replyWithContact('79020410729', 'Fl0k13');
  }

  async clickVk(ctx: Context) {
    await ctx.replyWithHTML(`<b>\nВыберите город:</b>`, cityButtons());
  }

  async clickVkGU(ctx: Context) {
    await ctx.replyWithHTML(`<b>\nВыберите город:</b>`, cityGUButtons());
  }

  async clickTg(ctx: Context) {
    await ctx.replyWithHTML(`<b>\nВыберите пол:</b>`, sexButtons());
  }

  async clickTgFA(ctx: Context) {
    await ctx.replyWithHTML(`<b>\nВыберите пол:</b>`, sexFAButtons());
  }

  async clickRefund(ctx: Context) {
    await ctx.reply('Введите ваше сообщение:');
  }

  // async clickCity(ctx: Context, GU: boolean) {
  //   const data = ctx.callbackQuery.message;
  //   console.log(data['reply_markup']['inline_keyboard']);
  //   console.log(GU);
  // }

  async clickController(ctx: Context, GU: boolean, type?: string) {}

  async anotherClick(ctx: Context, GU: boolean, type?: string) {
    switch (type) {
      case 'spb':
        console.log('spb');
        break;
      case 'kalin':
        console.log('kalin');
    }
  }
}
