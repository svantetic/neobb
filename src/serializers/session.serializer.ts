import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/UserDto';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserDto, done: (err: Error, user: UserDto) => void): any {
    console.log('serializer user', user);
    
    done(null, user);
  }
  deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
    done(null, payload);
  }
}