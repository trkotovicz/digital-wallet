import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Account } from "./Account";

export enum TransactionType {
  DEBIT = "debit",
  CREDIT = "credit",
}

@Entity({ name: "transactions" })
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

  @Column({ type: "enum", enum: TransactionType, nullable: false })
  type: TransactionType;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
