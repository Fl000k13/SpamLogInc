import { Action, InjectBot, Start, Update } from 'nestjs-telegraf';
import { AppService } from './app.service';
import { Context, Telegraf } from 'telegraf';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

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
}
