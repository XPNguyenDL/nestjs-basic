import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({
        type: mongoose.Schema.ObjectId
    })
    id: string;

    @Prop({
        maxlength: 512
    })
    name: string;

    @Prop({
        isRequired: true,
        maxlength: 256,
        default: 'Email'
    })
    email: string;

    @Prop({
        maxlength: 12
    })
    phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);