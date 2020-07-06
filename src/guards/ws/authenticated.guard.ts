import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToWs().getClient();
    const sid = this.getSessionCookie(request.handshake.headers.cookie);
    const httpContext = context.switchToHttp().getRequest();
    
    return request.isAuthenticated();
  }

  getSessionCookie(cookieString: string): string {
    const connectSid = 'connect.sid=';
    return cookieString.slice(cookieString.indexOf(connectSid) + connectSid.length, cookieString.indexOf(';'));
  }
}