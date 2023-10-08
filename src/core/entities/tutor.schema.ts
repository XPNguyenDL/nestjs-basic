import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Tutor extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true, maxlength: 1024 })
  description: string;

  @Prop({ required: true, type: Number })
  hourlyRate: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'StudentTutorRelationship' }] })
  studentTutorRelationships: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TutorEvaluation' }] })
  tutorEvaluations: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TutorStudentRelationship' }] })
  tutorStudentRelationships: Types.ObjectId[];
}

export const TutorSchema = SchemaFactory.createForClass(Tutor);
