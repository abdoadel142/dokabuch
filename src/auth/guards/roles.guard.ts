import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private readonly authService: AuthService,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
 
    const { user } = context.switchToHttp().getRequest();
    
    if(user.roles.includes(Role.User)){
      const activeAuth = await this.authService.findActive()
      let active=activeAuth.isActive
      
      if(!active) throw new HttpException("Restaurant not active ",HttpStatus.NOT_ACCEPTABLE)
      
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}