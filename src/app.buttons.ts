import { Markup } from 'telegraf';

export function startingButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('📩Аккаунты', 'logs'),
    Markup.button.callback('📔Мой профиль', 'profile'),
    Markup.button.callback('❔Поддержка', 'support'),
  ]);
}

export function logsButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('Vk', 'vk'),
    Markup.button.callback('Vk(ГУ)', 'vkGU'),
    Markup.button.callback('Tg', 'tg'),
    Markup.button.callback('Tg(2FA)', 'tgFA'),
    Markup.button.callback('Возврат аккаунта', 'refund'),
  ]);
}
