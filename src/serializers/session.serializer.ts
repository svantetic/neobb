import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/UserDto';
import { UserService } from 'src/services/user.service';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(user: UserDto, done: (err: Error, user: string) => void): any {
    done(null, user.username);
  }
  async deserializeUser(username: string, done: (err: Error, user: string) => void): Promise<any> {
    try {
      const result = await this.userService.findByName(username);
      done(null, result.username);
    }
    catch (error) {
      done(error, username);
    }
    
  }
}