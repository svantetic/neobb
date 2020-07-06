import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from '../model/user.entity';
import { UserDto, RegisterUserDto } from "../dto/UserDto";
import { Request } from 'express';
import bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            select: ['username', 'avatar'],
            relations: ['threads', 'posts']
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
            select: ['id', 'email', 'password', 'username', 'active'],
            where: {
                username
            }
        })
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
}