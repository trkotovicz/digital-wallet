import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CardType } from '../../interfaces/ICard';

@Entity()
export class Card {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "enum", enum: CardType, nullable: false })
  value: string;

  @Column({ type: "varchar", length: 16, nullable: false, unique: true })
  number: string;

  @Column({ type: "int", length: 3, nullable: false })
  cvv: string;

  @Column({ type: "uuid", nullable: false })
  accountId: string;
  // FK Account
  // many cards allowed

  @CreateDateColumn({ name: "created_at", default: "now()" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", default: "now()" })
  updatedAt: Date;
}
