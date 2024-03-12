import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Account {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "int", nullable: false, default: '001', length: 3 })
  branch: number;

  @Column({ type: "int", nullable: false, unique: true, length: 8 })
  account: number;

  @Column({ type: "decimal", nullable: false, precision: 8, scale: 2 })
  balance: string;

  @Column({ type: "varchar", nullable: false })
  document: string;
  // FK Person (people)
  // many accounts allowed

  @CreateDateColumn({ name: "created_at", default: "now()" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", default: "now()" })
  updatedAt: Date;
}
