import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/UserDto';
import { UserService } from 'src/services/user.service';
import { UserRole } from 'src/model/user.entity';
@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super();
    }
    serializeUser(
        user: UserDto,
        done: (err: Error, user: { username: string; role: UserRole }) => void,
    ): any {
        const { username, role } = user;
        done(null, {
            username,
            role,
        });
    }
    async deserializeUser(
        user: UserDto,
        done: (err: Error, user: { username: string; role: UserRole }) => void,
    ): Promise<any> {
        try {
            const result = await this.userService.findByName(user.username);
            const { username, role } = result;
            done(null, {
                username,
                role,
            });
        } catch (error) {
            done(error, {
                username: user.username,
                role: user.role,
            });
        }
    }
}
