import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VersionSchema } from './entities/version.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[  MongooseModule.forFeature([{ name: 'Version', schema: VersionSchema }]),
  AuthModule],
  controllers: [VersionController],
  providers: [VersionService]
})
export class VersionModule {}
