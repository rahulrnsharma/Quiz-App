import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { IModel } from 'src/interface/model.interface';
import { Time } from './base.schema';

export type QuizParticipantDocument = HydratedDocument<QuizParticipant>;


@Schema({ timestamps: true })
export class QuizParticipant extends Time {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'quizs' })
    quiz: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' })
    user: ObjectId;
    @Prop({ type: Number, required: false, default: 0 })
    rank: number;
    @Prop({ type: Number, required: false, default: 0 })
    score: number;
}

export const QuizParticipantSchema = SchemaFactory.createForClass(QuizParticipant);

export const QuizParticipantModel: IModel = {
    schema: QuizParticipantSchema,
    name: 'quiz-participant'
};