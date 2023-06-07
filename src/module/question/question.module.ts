import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QUESTION_SCHEMA } from "src/schema";
import { QuestionController } from "./question.controller";
import { QuestionService } from "src/services/question.service";


@Module({
    imports: [MongooseModule.forFeature([QUESTION_SCHEMA])],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: []
})

export class AppQuestionModule { }
