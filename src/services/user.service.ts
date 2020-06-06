import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from '../model/user.entity';
import { UserDto } from "../dto/UserDto";
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User> {
        console.log('find by email', email);
        return await this.userRepository.findOne({ 
            select: ['email', 'password'],
            where: {
                email,
            },
        });
    }

    async findByName(name: string): Promise<User> {
        return await this.userRepository.findOne({
            select: ['email', 'password', 'name'],
            where: {
                name
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

    async create(userDto: UserDto): Promise<User> {
        const user = new User();
        user.avatar = '';
        user.email = userDto.email;
        user.name = userDto.name;
        user.password = userDto.password;

        return await this.userRepository.save(user);
    }

    async emailExists(email: string): Promise<boolean> {
        const userExists = await this.userRepository.find({ email });
        return userExists.length > 0;
    }
}