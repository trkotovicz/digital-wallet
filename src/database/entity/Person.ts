import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Account } from "./Account";

@Entity({ name: 'people'})
export class Person {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", nullable: false })
  document: string;

  @Column({ type: "varchar", nullable: false, length: 100 })
  name: string;

  @Column({ type: "varchar", nullable: false, length: 60 })
  password: string;

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
  })
  updatedAt: Date;

  @OneToMany(() => Account, (account) => account.person)
  accounts: Account[];
}
