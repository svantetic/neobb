import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Exclusion, ManyToOne, OneToMany } from 'typeorm';
import * as crypto from 'crypto';
import { ExclusionMetadata } from 'typeorm/metadata/ExclusionMetadata';
import * as bcrypt from 'bcrypt';
import { Thread } from './thread.entity';
import { Post } from './post.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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
}