import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ActivationMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService,) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const activeAuth = await this.authService.findActive()
    let active=activeAuth.canPlaceOrder
    
    if(!active){
        throw new HttpException("can not place order write now ",HttpStatus.METHOD_NOT_ALLOWED)
    }
    next();
  }
}
