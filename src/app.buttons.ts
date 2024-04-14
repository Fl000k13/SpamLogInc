import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard([
    Markup.button.callback('Вк', 'vk'),
    Markup.button.callback('Вк(ГУ)', 'vkGU'),
    Markup.button.callback('Тг', 'tg'),
    Markup.button.callback('Тг(2FA)', 'tgFA'),
  ]);
}
