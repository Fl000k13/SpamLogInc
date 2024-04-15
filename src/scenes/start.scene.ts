import { Injectable } from '@nestjs/common';
import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/scenes';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
@Scene('startScene')
export class StartScene {
  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
  ) {}
  @SceneEnter()
  async startEnter(@Ctx() ctx: SceneContext) {
    const keyboard = await ctx.reply(`Привет, ${ctx.from.first_name}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: '📜Аккаунты', callback_data: 'logs' }],
          [{ text: '📂Мой профиль', callback_data: 'profile' }],
          [{ text: '❔Поддержка', callback_data: 'support' }],
        ],
      },
    });
    return keyboard;
  }

  @Action('logs')
  async startLogsScene(@Ctx() ctx: SceneContext) {
    await ctx.scene.enter('logScene');
  }

  @Action('profile')
  async profile(@Ctx() ctx: SceneContext) {
    const name = ctx.from.first_name;
    const user = await this.userEntity.findOne({
      where: { id: ctx.from.id },
    });
    console.log(user);
    await ctx.replyWithHTML(
      `<b>Имя: ${name}</b> \n<b>Номер сотрудника: ${user.number}</b> \n<b>Взято аккаунтов: ${user.monthlylogs}</b> \n<b>Возвратов: ${user.monthlyreturns}</b>`,
    );
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [[{ text: '◀️', callback_data: 'backMenu' }]],
    });
  }

  @Action('support')
  async support(@Ctx() ctx: SceneContext) {
    await ctx.reply('Системный администратор:');
    await ctx.replyWithContact('79020410729', 'Fl0k13');
  }
}
