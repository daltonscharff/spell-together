import { Puzzle } from "./puzzle";
import { Room } from "./room";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity('records')
export class Record extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 128 })
    playerName: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    foundAt: string;

    @ManyToOne(() => Puzzle)
    puzzle: Puzzle;

    @ManyToOne(() => Room)
    room: Room;
}
