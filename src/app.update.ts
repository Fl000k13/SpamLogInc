import { Action, Hears, Start, Update } from 'nestjs-telegraf';
import { AppService } from './app.service';
import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/scenes';

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

  // @Action('logs')
  // clickLogs(ctx: Context) {
  //   return this.appService.clickLogs(ctx);
  // }

  @Action('logs')
  clickLogs(ctx: SceneContext) {
    ctx.scene.enter('logScene');
  }

  @Action('backMenu')
  clickBackToMenu(ctx: Context) {
    return this.appService.startCommand(ctx);
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

  // @Action(['spb', 'kalin', 'spbGU', 'kalinGU'])
  // clickCity(ctx: Context, GU: boolean) {
  //   return this.appService.clickCity(ctx, GU);
  // }

  @Hears('🧂Спб')
  spb(ctx: Context) {
    return this.appService.clickController(ctx, false, 'spb');
  }

  @Hears('🇩🇪Калининград')
  kalin(ctx: Context) {
    return this.appService.clickController(ctx, false, 'kalin');
  }

  @Hears('🧂Спб(ГУ)')
  spbGU(ctx: Context) {
    return this.appService.clickController(ctx, true, 'spbGU');
  }

  @Hears('🇩🇪Калининград(ГУ)')
  kalinGU(ctx: Context) {
    return this.appService.clickController(ctx, true, 'kalinGU');
  }

  @Hears('👦Мужской')
  male(ctx: Context) {
    return this.appService.anotherClick(ctx, false, 'male');
  }

  @Hears('👩Женский')
  female(ctx: Context) {
    return this.appService.anotherClick(ctx, false, 'female');
  }

  @Hears('👦Мужской(2FA)')
  maleFA(ctx: Context) {
    return this.appService.anotherClick(ctx, true, 'maleFA');
  }

  @Hears('👩Женский(2FA)')
  femaleFA(ctx: Context) {
    return this.appService.anotherClick(ctx, true, 'femaleFA');
  }
}
