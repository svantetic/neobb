import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Thread } from './thread.entity';
import { Post } from './post.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({default: ''})
    avatar: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 5);
    }

    @OneToMany(type => Thread, thread => thread.author)
    threads: Thread[];

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

    @CreateDateColumn()
    createdAt

    @UpdateDateColumn()
    updatedAt
}