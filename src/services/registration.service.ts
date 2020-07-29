import { Injectable } from '@nestjs/common';
import { ToBeActivated } from 'src/model/tobeactivated.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/dto/UserDto';
import { User } from 'src/model/user.entity';
import bcrypt = require('bcryptjs');
const fs = require('fs');
import { join } from 'path';

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(ToBeActivated)
        private repository: Repository<ToBeActivated>,
    ) {}

    public async createToBeActivatedUser(user: User): Promise<ToBeActivated> {
        const toBeActivated = new ToBeActivated();
        toBeActivated.user = user;
        toBeActivated.token = bcrypt.hashSync(
            `${user.id}${user.email}${user.username}`,
        );
        this.generateEmail(user, toBeActivated.token);
        return this.repository.manager.save(toBeActivated);
    }

    private async generateEmail(user: User, token: string): Promise<any> {
        const content = `
      to: ${user.email}
      username: ${user.username}
      token: ${token}
    `;

        fs.writeFile(
            join(__dirname, `../../src/emails/${user.username}.txt`),
            content,
            err => {
                if (err) throw err;
                console.log('email saved');
                console.log(token);
            },
        );
    }

    public async validateToken(token: string): Promise<false | ToBeActivated> {
        const toBeActivated = await this.repository.findOne({
            select: ['id', 'token', 'user'],
            relations: ['user'],
            where: {
                token,
            },
        });

        if (!toBeActivated) {
            return false;
        }

        return toBeActivated;
    }

    public async delete(toBeDeleted: ToBeActivated) {
        this.repository.delete(toBeDeleted);
    }
}
