    import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  
  @Prop({type:Boolean,default:true})
  isActive: Boolean;

  @Prop({type:Boolean,default:true})
  canPlaceOrder: Boolean;

  @Prop()
  appVersion: Number;
 
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

