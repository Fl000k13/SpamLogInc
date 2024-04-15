import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { AppUpdate } from './app.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { LogScene } from './scenes/log.scene';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: '6580883619:AAHqGfU8zeMK604kOBm-BwOfzQJ2PfZE2Y8',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      database: 'spamzone',
      username: 'admin',
      password: 'admin',
      entities: [User, Account],
      migrations: [join(__dirname, '**', '*.migration.{ts,js}')],
      synchronize: true,
      schema: 'public',
    }),
    TypeOrmModule.forFeature([User, Account]),
  ],
  providers: [AppService, AppUpdate, LogScene],
})
export class AppModule {}
