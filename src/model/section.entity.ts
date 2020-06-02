import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Segment } from './segment.entity';
import { Thread } from "./thread.entity";

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => Segment, segment => segment.sections)
    segment: Segment;

    @OneToMany(type => Thread, thread => thread.section)
    threads: Thread[];
}
