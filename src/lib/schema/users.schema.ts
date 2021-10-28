import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../entities/user';

@Schema()
export class User implements IUser {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: () => new Date() })
  createdAt: Date;
  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
