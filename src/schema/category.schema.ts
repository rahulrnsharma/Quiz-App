import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Base } from "./base.schema";
import { IModel } from "src/interface/model.interface";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category extends Base {
    @Prop({ type: String, required: true, unique: true })
    name: string;
    @Prop({ type: String, required: true })
    code: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category)

export const CategoryModel: IModel = {
    schema: CategorySchema,
    name: 'category'
}