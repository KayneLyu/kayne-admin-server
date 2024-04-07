import { Role } from './roles.decorator';
import { AppService } from './app.service';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const classMeta = this.reflector.get('roles', context.getClass())
    const method = this.reflector.get<Role[]>('roles', context.getHandler())
    // console.log(classMeta,method);
    if(!method) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest()
    return user && true
  }
}
