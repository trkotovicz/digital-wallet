import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CardType } from "../../interfaces/ICard";
import { Account } from "./Account";

@Entity({ name: "cards" })
export class Card {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @ManyToOne(() => Account, (account) => account.cards)
  @JoinColumn({ name: "account_id" })
  accountId: Account;

  @Column({ type: "enum", enum: CardType, nullable: false })
  type: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  number: string;

  @Column({ type: "int", nullable: false })
  cvv: string;

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
}
