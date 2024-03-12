import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Table,
  UpdateDateColumn,
} from "typeorm";
import { CardType } from "../../interfaces/ICard";
import { Account } from "./Account";

@Entity()
export class Card {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @ManyToOne(() => Account, (account) => account.cards)
  accountId: Account;

  @Column({ type: "enum", enum: CardType, nullable: false })
  type: string;

  @Column({ type: "varchar", length: 16, nullable: false, unique: true })
  number: string;

  @Column({ type: "int", length: 3, nullable: false })
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
