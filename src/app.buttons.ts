import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard([
    Markup.button.callback('Аккаунты✉️', 'logs'),
    Markup.button.callback('Мой профиль', 'lk'),
  ]);
}
