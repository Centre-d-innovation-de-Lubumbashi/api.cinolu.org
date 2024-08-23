import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SearchModule } from './shared/modules/search/search.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { ProgramsModule } from './modules/programs/programs.module';
import { RequirementsModule } from './modules/requirements/requirements.module';
import { RolesModule } from './modules/roles/roles.module';
import { TypesModule } from './modules/types/types.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/modules/database/database.module';
import { EmailModule } from './shared/modules/email/email.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..'),
      renderPath: '/uploads'
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    EmailModule,
    DatabaseModule,
    SearchModule,
    ProgramsModule,
    AttachmentsModule,
    RequirementsModule,
    TypesModule,
    NotificationModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
