import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOperator } from 'typeorm';
import { User, UserRole } from '../model/user.entity';
import { UserDto, RegisterUserDto } from '../dto/UserDto';
import { Request } from 'express';
import bcrypt = require('bcryptjs');
import { Http2ServerResponse } from 'http2';
import { username } from 'src/config/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(additionalFields?: Array<keyof User>): Promise<User[]> {
        const extra = additionalFields ? additionalFields : [];
        return await this.userRepository.find({
            select: ['username', 'avatar', ...extra],
            relations: ['threads', 'posts'],
        });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            select: ['email', 'password'],
            where: {
                email,
            },
        });
    }

    async findByName(username: string): Promise<User> {
        return await this.userRepository.findOne({
            select: ['id', 'email', 'password', 'username', 'active', 'role'],
            where: {
                username,
            },
        });
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                id,
            },
        });
    }

    async create(userDto: RegisterUserDto): Promise<User> {
        const user = new User();
        user.avatar = '';
        user.username = userDto.username;
        user.password = userDto.password;
        user.email = userDto.email;

        return await this.userRepository.save(user);
    }

    async emailExists(email: string): Promise<boolean> {
        const userExists = await this.userRepository.find({ email });
        return userExists.length > 0;
    }

    isLoggedIn(request: Request): boolean {
        return request.session.passport.user;
    }

    async activateUser(user: User): Promise<User> {
        const userToActivate = await this.userRepository.findOne(user.id);
        userToActivate.active = true;
        return this.userRepository.manager.save(userToActivate);
    }

    private getPromotedRole(role: UserRole): UserRole {
        switch (role) {
            case UserRole.USER:
                return UserRole.MODERATOR;
            case UserRole.MODERATOR:
                return UserRole.ADMIN;
            default:
                return UserRole.ADMIN;
        }
    }

    async promoteUser(user: User): Promise<User> {
        const existingUser = await this.findById(user.id);
        if (!existingUser || (await existingUser.username) !== user.username) {
            throw new NotFoundException();
        }

        existingUser.role = this.getPromotedRole(user.role);
        return this.userRepository.manager.save(existingUser);
    }
}
