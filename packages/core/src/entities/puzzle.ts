import { Word } from "./word";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Entity("puzzles")
export class Puzzle extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", default: () => "CURRENT_DATE" })
  date: string;

  @Column({ type: "simple-array" })
  letters: string[];

  @Column({ type: "varchar", length: 1 })
  centerLetter: string;

  @Column({ type: "int" })
  maxScore: number;

  @ManyToMany(() => Word)
  @JoinTable()
  answers: Word[];
}
