import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   ManyToOne,
   JoinColumn,
} from "typeorm";
import TrashPoint from "./TrashPoint";

@Entity("images")
export default class Image {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column()
   path: string;

   @ManyToOne(() => TrashPoint, (trashpoint) => trashpoint.images)
   @JoinColumn({ name: "trashpoint_id" })
   trashpoint: TrashPoint;
}
