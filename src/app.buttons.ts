import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('📩Аккаунты', 'logs'),
    Markup.button.callback('📔Мой профиль', 'profile'),
    Markup.button.callback('❔Поддержка', 'support'),
  ]);
}
