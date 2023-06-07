import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { PlatformTypeEnum } from 'src/enum/common.enum';
import { RoleEnum } from 'src/enum/role.enum';
import { IModel } from 'src/interface/model.interface';
import { Time } from './base.schema';

export type LoginDocument = HydratedDocument<Login>;

@Schema({ timestamps: true })
export class Login extends Time {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    user: ObjectId;
    @Prop({ type: String, enum: RoleEnum, required: true, trim: true })
    role: string;
    @Prop({ type: String, default: '' })
    ip: string;
    @Prop({ type: String, enum: PlatformTypeEnum, trim: true })
    platform: string;
    @Prop({ type: Boolean, default: true })
    isLoggedIn: boolean;
}

export const LoginSchema = SchemaFactory.createForClass(Login);

export const LoginModel: IModel = {
    schema: LoginSchema,
    name: 'login'
};