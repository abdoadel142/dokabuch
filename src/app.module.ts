import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module'; 
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ExtrasModule } from './extras/extras.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://adel:adel142142142@cluster0.mgvx10x.mongodb.net/?retryWrites=true&w=majority'), 
    ProductModule, UserModule, AuthModule, CartModule, UserModule, ExtrasModule, CategoryModule, OrderModule, LocationModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
