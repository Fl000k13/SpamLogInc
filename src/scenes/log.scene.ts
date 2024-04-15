import { Injectable } from '@nestjs/common';
import { Action, Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/scenes';
import { Update } from 'telegraf/typings/core/types/typegram';
import {
  cityButtons,
  logsButtons,
  sexButtons,
  sexVkButtons,
} from '../app.buttons';

@Injectable()
@Scene('logScene')
export class LogScene {
  private socialChoose: string;
  private sexChoose: string;
  private cityChoose: string;
  private MESSAGE_ID?: number;
  @SceneEnter()
  async logEnter(@Ctx() ctx: SceneContext) {
    const message = await ctx.replyWithHTML(
      `<b>Выберите соц. сеть:</b>`,
      logsButtons(),
    );
    this.MESSAGE_ID = message.message_id;
    console.log(message);
  }

  @Action(/vk/)
  async vkClick(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.deleteMessage(this.MESSAGE_ID);
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;

    console.log('vk', userAnswer);

    this.socialChoose = userAnswer;
    const message = await ctx.replyWithHTML(
      `<b>Выберите город:</b>`,
      cityButtons(),
    );
    this.MESSAGE_ID = message.message_id;
  }

  @Action(/tg|tgFA/)
  async tgClick(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.deleteMessage(this.MESSAGE_ID);
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;

    console.log('tg', userAnswer);

    this.socialChoose = userAnswer;
    const message = await ctx.replyWithHTML(
      `<b>Выберите пол:</b>`,
      sexButtons(),
    );
    this.MESSAGE_ID = message.message_id;
  }

  @Action('backSocial')
  async backSocial(@Ctx() ctx: SceneContext) {
    await ctx.deleteMessage(this.MESSAGE_ID);
    await this.logEnter(ctx);
  }

  @Action(/spb|kalin/)
  async cityClick(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.deleteMessage(this.MESSAGE_ID);
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;

    console.log('city', userAnswer);

    this.cityChoose = userAnswer;
    const message = await ctx.replyWithHTML(
      `<b>Выберите пол:</b>`,
      sexVkButtons(),
    );
    this.MESSAGE_ID = message.message_id;
  }

  @Action('backCities')
  async backCities(@Ctx() ctx: SceneContext) {
    await ctx.deleteMessage(this.MESSAGE_ID);
    const message = await ctx.replyWithHTML(
      `<b>Выберите город:</b>`,
      cityButtons(),
    );
    this.MESSAGE_ID = message.message_id;
  }

  @Action(/male|female/)
  async sexClick(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.deleteMessage(this.MESSAGE_ID);
    const query = ctx.update.callback_query;
    const userAnswer = 'data' in query ? query.data : null;

    console.log('sex', userAnswer);
    this.sexChoose = userAnswer;
    const message = await ctx.reply('Введите количество аккаунтов (до 5-ти)');
    this.MESSAGE_ID = message.message_id;
  }

  @Hears(['1', '2', '3', '4', '5'])
  async checkout(@Ctx() ctx: SceneContext) {
    await ctx.deleteMessage(this.MESSAGE_ID);
    const number = parseInt(ctx.message['text']);
    let message;
    if (this.socialChoose === 'TG' || 'TG(2FA)') {
      message = await ctx.replyWithHTML(
        `Ты выбрал: \n<b>Соц. сеть: </b>${this.#sceneChooser(this.socialChoose)} \n<b>Пол: </b>${this.#sexChooser(this.sexChoose)} \n<b>Кол-во аккаунтов: </b>${number}`,
      );
    } else {
      message = await ctx.replyWithHTML(
        `Ты выбрал: \n<b>Соц. сеть: </b>${this.#sceneChooser(this.socialChoose)} \n<b>Город: </b>${this.#cityChooser(this.cityChoose)} \n<b>Пол: </b>${this.#sexChooser(this.sexChoose)} \n<b>Кол-во аккаунтов: </b>${number}`,
      );
    }
    this.MESSAGE_ID = message.message_id;
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
