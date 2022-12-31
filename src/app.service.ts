import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ActiveDto } from './auth/dto/login-dto';

@Injectable()
export class AppService implements OnApplicationBootstrap {
 constructor(private readonly authService: AuthService,
  ) {} 
  onApplicationBootstrap() {
    this.activate()
  }
  getHello(): string {
    return 'Hello World!';
  }

  async activate(): Promise<any> {
    var activeDto :ActiveDto;
    const newAuth = await this.authService.create(activeDto
    )
    return newAuth;
  }
}
