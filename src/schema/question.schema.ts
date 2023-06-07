import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Base } from "./base.schema";
import { IModel } from "src/interface/model.interface";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { QuestionTypeEnum } from "src/enum/question.enum";

export type QuestionDocument = HydratedDocument<Question>

@Schema({ timestamps: true })
export class Question extends Base {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categories' })
    category: ObjectId;
    @Prop({ type: String, required: true })
    question: string;
    @Prop({ type: String, enum: QuestionTypeEnum, required: true, trim: true, default: QuestionTypeEnum.SINGLECHOICE })
    type: string;
    @Prop({ type: [String], required: true, minlength: 2, maxlength: 4 })
    option: string[]
    @Prop({ type: String, required: true })
    correct: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question)

export const QuestionModel: IModel = {
    schema: QuestionSchema,
    name: 'question'
}