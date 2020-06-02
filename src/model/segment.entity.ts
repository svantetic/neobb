import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Section } from './section.entity';
@Entity()
export class Segment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Section, section => section.segment)
    sections: Section[];
}
