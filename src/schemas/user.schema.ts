import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email format!`,
    },
  })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
