import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './entities/auth.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    UserModule, 
    PassportModule,     
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '360d' },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy
  ],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
