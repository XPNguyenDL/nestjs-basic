import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {

    @Prop({ required: true, maxlength: 255 })
    password: string;

    @Prop({ required: true, maxlength: 255 })
    email: string;

    @Prop({ default: '' })
    avatarUrl: string;

    @Prop({ default: '' })
    publicUrl: string;

    @Prop({ maxlength: 255, isRequired: true, default: '' })
    fullname: string;

    @Prop({ default: new Date()})
    birthday: Date;

    @Prop({ maxlength: 50, default: ''})
    phone: string;

    @Prop({ maxlength: 255, default: ''})
    address: string;

    @Prop({ maxlength: 50 })
    userType: string;

    @Prop({ type: Types.ObjectId, ref: 'Tutor' })
    tutor: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Student' })
    student: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Notification' }] })
    notifications: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);