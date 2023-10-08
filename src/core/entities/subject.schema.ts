import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subject extends Document {
  @Prop({ required: true, maxlength: 512 })
  name: string;

  @Prop({ required: true, maxlength: 512 })
  urlSlug: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
