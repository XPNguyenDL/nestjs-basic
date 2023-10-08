import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tutor } from './tutor.schema';
import { Student } from './student.schema';

@Schema()
export class Schedule extends Document {
  @Prop({ required: true })
  tutorId: Types.ObjectId;

  @Prop({ required: true })
  studentId: Types.ObjectId;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop()
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Tutor' })
  tutor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Student' })
  student: Types.ObjectId;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
