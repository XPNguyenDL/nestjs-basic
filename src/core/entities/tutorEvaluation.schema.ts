import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TutorEvaluation extends Document {
  @Prop({ required: true })
  studentId: number;

  @Prop({ required: true })
  tutorId: number;

  @Prop()
  rating: number;

  @Prop()
  comment: string;

  @Prop({ type: Number })
  priceEvaluation: number;

  @Prop({ type: Types.ObjectId, ref: 'Student' })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tutor' })
  tutor: Types.ObjectId;
}

export const TutorEvaluationSchema = SchemaFactory.createForClass(TutorEvaluation);
