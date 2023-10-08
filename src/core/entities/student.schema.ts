import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Student extends Document {

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'StudentTutorRelationship' }] })
  studentTutorRelationships: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TutorEvaluation' }] })
  tutorEvaluations: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TutorStudentRelationship' }] })
  tutorStudentRelationships: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
