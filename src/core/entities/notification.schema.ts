import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ required: true })
  senderId: Types.ObjectId;

  @Prop({ required: true })
  receiverId: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  isRead: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  receiver: Types.ObjectId;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
