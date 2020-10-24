import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   OneToMany,
   JoinColumn,
} from "typeorm";
import Image from "./Image";

@Entity("trashpoint")
export default class TrashPoint {
   @PrimaryGeneratedColumn("increment")
   id: number;

   @Column()
   reporterName: string;

   @Column()
   reporterContact: string;

   @Column()
   latitude: number;

   @Column()
   longitude: number;

   @Column()
   description: number;

   @Column()
   assignee: string;

   @Column()
   assigneeContact: string;

   @Column()
   severity: string;

   @Column()
   progress: string;

   @OneToMany(() => Image, (image) => image.trashpoint, {
      cascade: ["insert", "update"],
   })
   @JoinColumn({ name: "trashpoint_id" })
   images: Image[];
}
