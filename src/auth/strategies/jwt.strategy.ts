import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import 'dotenv/config'
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(    private readonly authService: AuthService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const activeAuth = await this.authService.findActive()
    let active=activeAuth.isActive
    console.log(activeAuth,"ddddddd");
    
    if(!active) throw new HttpException("Restaurant not active ",HttpStatus.NOT_ACCEPTABLE)
    return { userId: payload.sub, username: payload.username,email: payload.email, roles: payload.roles };
  }
}