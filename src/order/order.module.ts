import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ActivationMiddleware } from './middleware/activation.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    AuthModule
    ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderService]
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ActivationMiddleware)
      .forRoutes('order');
  }
}
