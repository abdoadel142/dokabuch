import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module'; 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { ExtrasModule } from './extras/extras.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://adel:adel142142142@cluster0.mgvx10x.mongodb.net/?retryWrites=true&w=majority'), 
    ProductModule, UserModule, AuthModule, CartModule, UsersModule, ExtrasModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
