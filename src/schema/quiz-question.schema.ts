import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { IModel } from 'src/interface/model.interface';
import { Base } from './base.schema';

export type QuizQuestionDocument = HydratedDocument<QuizQuestion>;


@Schema({ timestamps: true })
export class QuizQuestion extends Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'quizs' })
    quiz: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'questions' })
    quesion: ObjectId
}

export const QuizQuestionSchema = SchemaFactory.createForClass(QuizQuestion);

export const QuizQuestionModel: IModel = {
    schema: QuizQuestionSchema,
    name: 'quiz-question'
};