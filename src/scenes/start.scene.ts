import { Injectable } from '@nestjs/common';
import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/scenes';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Markup } from 'telegraf';

@Injectable()
@Scene('startScene')
export class StartScene {
  private MESSAGE_ID: number;
  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
  ) {}
  @SceneEnter()
  async startEnter(@Ctx() ctx: SceneContext) {
    const message = await ctx.replyWithHTML(
      `<b>Привет, ${ctx.from.first_name}</b>`,
    );
    this.MESSAGE_ID = message.message_id;
    return Markup.inlineKeyboard([
      Markup.button.callback('📩Аккаунты', 'logs'),
      Markup.button.callback('📔Мой профиль', 'profile'),
      Markup.button.callback('❔Поддержка', 'support'),
    ]);
  }

  @Action('logs')
  async startLogsScene(@Ctx() ctx: SceneContext) {
    await ctx.deleteMessage(this.MESSAGE_ID);
    await ctx.scene.enter('logScene');
  }

  @Action('profile')
  async profile(@Ctx() ctx: SceneContext) {
    const name = ctx.from.first_name;
    await ctx.deleteMessage(this.MESSAGE_ID);
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
    await ctx.deleteMessage(this.MESSAGE_ID);
    await ctx.replyWithContact('79020410729', 'Fl0k13');
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [[{ text: '◀️', callback_data: 'backMenu' }]],
    });
  }

  @Action('backMenu')
  async backMenu(@Ctx() ctx: SceneContext) {
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [{ text: '📜Аккаунты', callback_data: 'logs' }],
        [{ text: '📂Мой профиль', callback_data: 'profile' }],
        [{ text: '❔Поддержка', callback_data: 'support' }],
      ],
    });
  }
}
