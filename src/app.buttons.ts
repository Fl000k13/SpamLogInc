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

export function cityButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('🧂Спб', 'spb'),
    Markup.button.callback('🇩🇪Калининград', 'kalin'),
  ]);
}

export function cityGUButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('🧂Спб', 'spbGU'),
    Markup.button.callback('🇩🇪Калининград', 'kalinGU'),
  ]);
}

export function sexButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('👦Мужской', 'male'),
    Markup.button.callback('👩Женский', 'female'),
  ]);
}

export function sexFAButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('👦Мужской', 'maleFA'),
    Markup.button.callback('👩Женский', 'femaleFA'),
  ]);
}