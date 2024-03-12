import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Person {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  document: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  name: string;

  @Column({ type: "varchar", nullable: false, length: 60 })
  password: string;

  @CreateDateColumn({ name: "created_at", default: "now()" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", default: "now()" })
  updatedAt: Date;
}
