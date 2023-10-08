import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class StudentTutorRelationship extends Document {
  @Prop({ required: true, unique: true })
  studentTutorRelationshipId: number;

  @Prop({ required: true })
  studentId: number;

  @Prop({ required: true })
  tutorId: number;

  @Prop({ type: Types.ObjectId, ref: 'Student' })
  student: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tutor' })
  tutor: Types.ObjectId;
}

export const StudentTutorRelationshipSchema = SchemaFactory.createForClass(StudentTutorRelationship);
