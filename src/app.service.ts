import { Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import {
  cityButtons,
  logsButtons,
  sexButtons,
  startingButtons,
} from './app.buttons';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectBot } from 'nestjs-telegraf';
import * as process from "process";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
    @InjectRepository(Account)
    private readonly accountEntity: Repository<Account>,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}
  async startCommand(ctx: Context) {
    const chatId = '194088690';
    const userId = ctx.from.id;

    try {
      const chatMember = await ctx.telegram.getChatMember(chatId, userId);

      if (
        chatMember.status === 'member' ||
        chatMember.status === 'administrator'
      ) {
        console.log(ctx.from.id);
        const user = await this.userEntity.findOne({
          where: { id: ctx.from.id },
        });
        console.log(user);

        if (user === null) {
          console.log('creating');
          const newUser = this.userEntity.create({
            id: ctx.from.id,
            number: Math.floor(Math.random() * (10000 - 19999) + 10000),
            name: ctx.from.first_name,
            monthlylogs: 0,
            monthlyreturns: 0,
          });
          await this.userEntity.save(newUser);
        }
        await ctx.reply(`Привет, ${ctx.from.first_name}.`, startingButtons());
      } else {
        await ctx.reply(process.env.START_TEXT);
      }
    } catch (error) {
      console.log(error);
      await ctx.reply(process.env.START_TEXT);
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
    await ctx.replyWithHTML(`<b>\nВыберите город:</b>`, cityButtons());
  }

  async clickTg(ctx: Context) {
    await ctx.replyWithHTML(`<b>\nВыберите пол:</b>`, sexButtons());
  }

  async clickTgFA(ctx: Context) {
    await ctx.replyWithHTML(`<b>\nВыберите пол:</b>`, sexButtons());
  }

  async clickRefund(ctx: Context) {
    await ctx.reply('Введите ваше сообщение:');
  }
}
