import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleEnum } from 'src/enum/role.enum';
import { IModel } from 'src/interface/model.interface';
import { Base } from './base.schema';

export type UserDocument = HydratedDocument<User>;

class Device {
    @Prop({ type: String, required: true })
    id: string;
    @Prop({ type: String, required: true })
    name: string;
    @Prop({ type: String, required: true })
    token: string;
}

@Schema({ timestamps: true })
export class User extends Base {
    @Prop({ type: String, required: true, default: '91' })
    countryCode: string;
    @Prop({ type: String, required: true, index: true, unique: true })
    mobile: string;
    @Prop({ type: String, enum: [RoleEnum.USER], trim: true, default: RoleEnum.USER })
    role: string;
    @Prop({ type: String })
    firstName: string;
    @Prop({ type: String })
    lastName: string;
    @Prop({ type: String })
    image: string;
    @Prop({ type: String, required: true, trim: true, unique: true })
    referral: string;
    @Prop({ type: String, default: null, trim: true })
    referredBy: string;
    @Prop({ type: Device })
    device: Device;
}
export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel: IModel = {
    schema: UserSchema,
    name: 'user'
};