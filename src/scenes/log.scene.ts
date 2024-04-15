import { Injectable } from '@nestjs/common';
import { Action, Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/scenes';
import { Update } from 'telegraf/typings/core/types/typegram';

@Injectable()
@Scene('logScene')
export class LogScene {
  private socialChoose: string;
  private sexChoose: string;
  private cityChoose: string;
  @SceneEnter()
  async logEnter(@Ctx() ctx: SceneContext) {
    await ctx.answerCbQuery('Выберите соц. сеть');
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [{ text: 'VK', callback_data: 'vk' }],
        [{ text: 'TG', callback_data: 'tg' }],
        [{ text: 'TG(2FA)', callback_data: 'tgFA' }],
        [{ text: 'Возврат', callback_data: 'refund' }],
        [{ text: '◀️', callback_data: 'backMenu' }],
      ],
    });
  }

  @Action(/vk/)
  async vkClick(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;

    console.log('vk', userAnswer);

    this.socialChoose = userAnswer;
    await ctx.answerCbQuery('Выберите город');
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [{ text: '🧂Спб', callback_data: 'spb' }],
        [{ text: '🇩🇪Калининград', callback_data: 'kalin' }],
        [{ text: '◀️', callback_data: 'backSocial' }],
      ],
    });
  }

  @Action(/tg|tgFA/)
  async tgClick(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;

    console.log('tg', userAnswer);

    this.socialChoose = userAnswer;
    await ctx.answerCbQuery('Выберите пол');
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [{ text: '👦Мужской', callback_data: 'male' }],
        [{ text: '👩Женский', callback_data: 'female' }],
        [{ text: '◀️', callback_data: 'backSocial' }],
      ],
    });
  }

  @Action('backSocial')
  async backSocial(@Ctx() ctx: SceneContext) {
    await this.logEnter(ctx);
  }

  @Action(/spb|kalin/)
  async cityClick(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;

    console.log('city', userAnswer);

    this.cityChoose = userAnswer;
    await ctx.answerCbQuery('Выберите пол');
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [{ text: '👦Мужской', callback_data: 'male' }],
        [{ text: '👩Женский', callback_data: 'female' }],
        [{ text: '◀️', callback_data: 'backCities' }],
      ],
    });
  }

  @Action('backCities')
  async backCities(@Ctx() ctx: SceneContext) {
    await ctx.answerCbQuery('Выберите город');
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [{ text: '🧂Спб', callback_data: 'spb' }],
        [{ text: '🇩🇪Калининград', callback_data: 'kalin' }],
        [{ text: '◀️', callback_data: 'backSocial' }],
      ],
    });
  }

  @Action(/male|female/)
  async sexClick(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;

    console.log('sex', userAnswer);
    this.sexChoose = userAnswer;
    await ctx.reply('Введите количество аккаунтов (до 5-ти)');
  }

  @Hears(['1', '2', '3', '4', '5'])
  async final(@Ctx() ctx: SceneContext) {
    const number = parseInt(ctx.message['text']);
    console.log(number);
    console.log(this.socialChoose);
    console.log(this.cityChoose);
    console.log(this.sexChoose);
    await ctx.replyWithHTML(
      `Ты выбрал: \n<b>Соц. сеть: </b>${this.#sceneChooser(this.socialChoose)} \n<b>Город: </b>${this.#cityChooser(this.cityChoose)} \n<b>Пол: </b>${this.#sexChooser(this.sexChoose)} \n<b>Кол-во аккаунтов: </b>${number}`,
    );
  }

  #sceneChooser(type: string) {
    switch (type) {
      case 'vk':
        return 'VK';
      case 'vkGU':
        return 'VK(ГУ)';
      case 'tg':
        return 'TG';
      case 'tgFA':
        return 'tgFA';
    }
  }

  #cityChooser(city: string) {
    if (city === undefined) {
      return 'Без города(TG)';
    }

    switch (city) {
      case 'kalin':
        return 'Калининград';
      case 'spb':
        return 'Спб';
    }
  }

  #sexChooser(sex: string) {
    switch (sex) {
      case 'male':
        return 'Мужской';
      case 'female':
        return 'Женский';
    }
  }
}