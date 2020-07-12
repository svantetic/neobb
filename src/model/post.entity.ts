import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Thread } from './thread.entity';
import { User } from './user.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @ManyToOne(
        type => Thread,
        thread => thread.posts,
        {
            onDelete: 'CASCADE',
        },
    )
    thread: Thread;

    @ManyToOne(
        type => User,
        user => user.posts,
        {
            onDelete: 'CASCADE',
        },
    )
    author: User;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;
}
