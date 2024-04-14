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
  return Markup.keyboard([
    Markup.button.callback('🧂Спб', 'spb'),
    Markup.button.callback('🇩🇪Калининград', 'kalin'),
  ]).resize();
}

export function cityGUButtons() {
  return Markup.keyboard([
    Markup.button.callback('🧂Спб(ГУ)', 'spbGU'),
    Markup.button.callback('🇩🇪Калининград(ГУ)', 'kalinGU'),
  ]).resize();
}

export function sexButtons() {
  return Markup.keyboard([
    Markup.button.callback('👦Мужской', 'male'),
    Markup.button.callback('👩Женский', 'female'),
  ]).resize();
}

export function sexFAButtons() {
  return Markup.keyboard([
    Markup.button.callback('👦Мужской(2FA)', 'maleFA'),
    Markup.button.callback('👩Женский(2FA)', 'femaleFA'),
  ]).resize();
}
