import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Transaction {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "decimal", nullable: false, precision: 8, scale: 2 })
  value: string;

  @Column({ type: "varchar", length: 60 })
  description: string;

  @Column({ type: 'uuid', nullable: false })
  accountId: string;
  // FK Account
  // many transactions allowed

  @CreateDateColumn({ name: "created_at", default: "now()" })
  createdAt: Date;
}
