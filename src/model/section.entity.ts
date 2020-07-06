import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Segment } from './segment.entity';
import { Thread } from "./thread.entity";
import { Post } from './post.entity';

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToOne(type => Post)
    @JoinColumn()
    latestPost: Post;

    @ManyToOne(type => Segment, segment => segment.sections)
    segment: Segment;

    @OneToMany(type => Thread, thread => thread.section)
    threads: Thread[];
}

export interface Stats {
    stats: {
        threads: number;
        posts: number;
    }
}