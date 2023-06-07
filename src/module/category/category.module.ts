import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CATEGORY_SCHEMA } from 'src/schema';
import { CategoryService } from 'src/services/category.service';
import { CategoryController } from './category.controller';

@Module({
    imports: [MongooseModule.forFeature([CATEGORY_SCHEMA])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: []
})
export class AppCategoryModule { }