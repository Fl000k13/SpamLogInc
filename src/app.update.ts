import { Action, Start, Update } from 'nestjs-telegraf';
import { AppService } from './app.service';
import { Context } from 'telegraf';

@Update()
export class AppUpdate {
  constructor(private readonly appService: AppService) {}

  @Start()
  startCommand(ctx: Context) {
    return this.appService.startCommand(ctx);
  }

  @Action('profile')
  clickProfile(ctx: Context) {
    return this.appService.clickProfile(ctx);
  }

  @Action('logs')
  clickLogs(ctx: Context) {
    return this.appService.clickLogs(ctx);
  }

  @Action('support')
  clickSupport(ctx: Context) {
    return this.appService.clickSupport(ctx);
  }

  @Action('vk')
  clickVk(ctx: Context) {
    return this.appService.clickVk(ctx);
  }

  @Action('vkGU')
  clickVkGU(ctx: Context) {
    return this.appService.clickVkGU(ctx);
  }

  @Action('tg')
  clickTg(ctx: Context) {
    return this.appService.clickTg(ctx);
  }

  @Action('tgFA')
  clickTgFA(ctx: Context) {
    return this.appService.clickTgFA(ctx);
  }

  @Action('refund')
  clickRefund(ctx: Context) {
    return this.appService.clickRefund(ctx);
  }
}
