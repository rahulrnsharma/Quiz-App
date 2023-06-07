import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleEnum } from 'src/enum/role.enum';
import { IModel } from 'src/interface/model.interface';
import { Base } from './base.schema';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin extends Base {
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String })
    lastName: string;
    @Prop({ type: String })
    image: string;
    @Prop({ type: String, required: true, index: true, unique: true, sparse: true })
    username: string;
    @Prop({ type: String, required: true })
    password: string;
    @Prop({ type: String, enum: [RoleEnum.ADMIN], required: true, trim: true, default: RoleEnum.ADMIN })
    role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

export const AdminModel: IModel = {
    schema: AdminSchema,
    name: 'admin'
};