import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AppDatabaseModule } from './module/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppAuthModule } from './module/auth/auth.module';
import { AppAdminModule } from './module/admin/admin.module';
import { AppInquiryModule } from './module/inquiry/inquiry.module';
import { AppSiteContentModule } from './module/site-content/site-content.module';
import { AppUserModule } from './module/user/user.module';
import { AppQuizModule } from './module/quiz/quiz.module';
import { AppQuestionModule } from './module/question/question.module';
import { AppCategoryModule } from './module/category/category.module';

const MODULES = [
  AppAdminModule,
  AppAuthModule,
  AppCategoryModule,
  AppInquiryModule,
  AppQuestionModule,
  AppQuizModule,
  AppSiteContentModule,
  AppUserModule
]

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AppDatabaseModule.forRootConnection(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ...MODULES
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
