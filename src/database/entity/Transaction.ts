import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Account } from "./Account";

@Entity()
export class Transaction {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @ManyToOne(() => Account, (account) => account.transactions)
  accountId: Account;

  @Column({
    type: "decimal",
    nullable: false,
    precision: 8,
    scale: 2,
  })
  value: number;

  @Column({ type: "varchar", length: 60 })
  description: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
