import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TutorSubject extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Tutor' })
  tutor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subject' })
  subject: Types.ObjectId;
}

export const TutorSubjectSchema = SchemaFactory.createForClass(TutorSubject);
