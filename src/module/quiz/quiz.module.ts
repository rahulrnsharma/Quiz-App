import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QUIZ_PARTICIPANT_SCHEMA, QUIZ_SCHEMA } from 'src/schema';
import { QuizController } from './quiz.controller';
import { QuizService } from 'src/services/quiz.service';

@Module({
    imports: [
        MongooseModule.forFeature([QUIZ_PARTICIPANT_SCHEMA, QUIZ_SCHEMA])
    ],
    controllers: [QuizController],
    providers: [QuizService],
    exports: []
})
export class AppQuizModule { }