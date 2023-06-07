import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { IModel } from 'src/interface/model.interface';
import { Base } from './base.schema';
import { QuizLevelEnum, QuizStatusEnum } from 'src/enum/quiz.enum';

export type QuizDocument = HydratedDocument<Quiz>;

class PrizeDistribute {
    @Prop({ type: Number, required: true })
    rankFrom: number;
    @Prop({ type: Number, required: true })
    rankTo: number;
    @Prop({ type: Number, required: true })
    prize: number;
}
const PrizeDistributeSchema = SchemaFactory.createForClass(PrizeDistribute);

@Schema({ timestamps: true })
export class Quiz extends Base {
    @Prop({ type: String, required: true })
    title: string;
    @Prop({ type: String, required: true })
    description: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categories' })
    category: ObjectId;
    @Prop({ type: Number, required: true })
    questions: number;
    @Prop({ type: String, enum: QuizLevelEnum, trim: true, default: QuizLevelEnum.MEDIUM })
    level: string;
    @Prop({ type: String, enum: QuizStatusEnum, trim: true, default: QuizStatusEnum.PENDING })
    status: string;
    @Prop({ type: Date, required: true })
    startDate: Date;
    @Prop({ type: Date, required: true })
    endDate: Date;
    @Prop({ type: Number, required: true })
    entry: number;
    @Prop({ type: Number, required: true })
    prizePool: number;
    @Prop({ type: Number, required: true })
    participent: number;
    @Prop({ type: Number, required: true })
    minParticipant: number;
    @Prop({ type: [PrizeDistributeSchema], required: true })
    prize: PrizeDistribute[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

export const QuizModel: IModel = {
    schema: QuizSchema,
    name: 'quiz'
};