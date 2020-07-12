import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Section } from './section.entity';

@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        type => Post,
        post => post.thread,
    )
    posts: Post[];

    @ManyToOne(
        type => User,
        user => user.threads,
        {
            onDelete: 'CASCADE',
        },
    )
    author: User;

    @ManyToOne(
        type => Section,
        section => section.threads,
    )
    section: Section;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;
}
