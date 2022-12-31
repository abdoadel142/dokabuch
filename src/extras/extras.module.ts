import { Module } from '@nestjs/common';
import { ExtrasService } from './extras.service';
import { ExtrasController } from './extras.controller';
import { ExtraSchema } from './entities/extra.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
  MongooseModule.forFeature([{ name: 'Extra', schema: ExtraSchema }]),
  AuthModule
  ],
  controllers: [ExtrasController],
  providers: [ExtrasService],
  exports: [ExtrasService]

})
export class ExtrasModule {}
