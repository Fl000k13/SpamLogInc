import { Injectable } from '@nestjs/common';
import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/scenes';
import { Update } from 'telegraf/typings/core/types/typegram';

@Injectable()
@Scene('logScene')
export class LogScene {
  @SceneEnter()
  async logEnter(@Ctx() ctx: SceneContext) {
    await ctx.reply('Выберите соц. сеть', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'VK', callback_data: 'vk' }],
          [{ text: 'VK(ГУ)', callback_data: 'vkGU' }],
          [{ text: 'TG', callback_data: 'tg' }],
          [{ text: 'TG(2FA)', callback_data: 'tgFA' }],
          [{ text: 'Возврат', callback_data: 'refund' }],
        ],
      },
    });
  }

  @Action(/vk|vkGu|tg|tgFa/)
  async fuck(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;
    console.log(userAnswer);
  }
}
