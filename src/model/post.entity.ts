import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Thread } from './thread.entity';
import { User } from './user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @ManyToOne(type => Thread, thread  => thread.posts)
    thread: Thread;

    @ManyToOne(type => User, user => user.posts)
    author: User;
}
