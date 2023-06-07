import { Prop } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";

export class Time {
    @Prop({ type: Date })
    createdAt: Date;
    @Prop({ type: Date })
    updatedAt: Date;
}

export class Base extends Time {
    @Prop({ type: mongoose.Schema.Types.ObjectId, select: false })
    createdBy: ObjectId;
    @Prop({ type: mongoose.Schema.Types.ObjectId, select: false })
    updatedBy: ObjectId;
    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}