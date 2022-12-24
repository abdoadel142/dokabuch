import { Module } from '@nestjs/common';
import { ExtrasService } from './extras.service';
import { ExtrasController } from './extras.controller';
import { ExtraSchema } from './entities/extra.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: 'Extra', schema: ExtraSchema }]),
  ],
  controllers: [ExtrasController],
  providers: [ExtrasService],
  exports: [ExtrasService]

})
export class ExtrasModule {}
