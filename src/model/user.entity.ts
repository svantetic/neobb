import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import bcrypt = require('bcryptjs');
import { Thread } from './thread.entity';
import { Post } from './post.entity';

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
}

export interface UserPromotionResponse {
    id: number;
    role: UserRole;
}
export interface UserBannedResponse {
    id: number;
    username: string;
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ default: '' })
    avatar: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
        nullable: false,
    })
    role: UserRole;

    @Column({ select: false, default: false })
    active: boolean;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 5);
    }

    @OneToMany(
        type => Thread,
        thread => thread.author,
        {
            onDelete: 'CASCADE',
        },
    )
    threads: Thread[];

    @OneToMany(
        type => Post,
        post => post.author,
        {
            onDelete: 'CASCADE',
        },
    )
    posts: Post[];

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;
}
