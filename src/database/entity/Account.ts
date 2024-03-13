import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card } from "./Card";
import { Person } from "./Person";
import { Transaction } from './Transaction';

@Entity({ name: "accounts" })
export class Account {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", nullable: false, default: "001" })
  branch: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  account: string;

  @Column({
    type: "decimal",
    nullable: false,
    precision: 8,
    scale: 2,
    default: 0,
  })
  balance: string;

  @Column({ type: "varchar", nullable: false })
  document: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @ManyToOne(() => Person, (person) => person.accounts)
  person: Person;

  @OneToMany(() => Transaction, (transaction) => transaction.accountId)
  transactions: Transaction[];

  @OneToMany(() => Card, (card) => card.accountId)
  cards: Card[];
}
