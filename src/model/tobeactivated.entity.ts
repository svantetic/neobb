import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Section } from './section.entity';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class ToBeActivated {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(type => Post)
    @JoinColumn()
    user: User;
}
