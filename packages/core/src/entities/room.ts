import { Word } from "./word";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity('rooms')
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int' })
    score: number;

    @Column({ length: 128, nullable: true })
    name: string;

    @ManyToMany(() => Word)
    @JoinTable()
    answers: Word[];
}
