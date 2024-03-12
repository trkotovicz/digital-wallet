import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDB1710190120500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "people",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "document",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            length: "60",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_DOCUMENT",
            columnNames: ["document"],
            isUnique: true,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "accounts",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "branch",
            type: "int",
            isNullable: false,
            default: "001",
          },
          {
            name: "account",
            type: "int",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "balance",
            type: "decimal",
            isNullable: false,
            precision: 8,
            scale: 2,
          },
          {
            name: "document",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["document"],
            referencedTableName: "people",
            referencedColumnNames: ["document"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isGenerated: true,
          },
          {
            name: "accountId",
            type: "uuid",
          },
          {
            name: "value",
            type: "decimal",
            isNullable: false,
            precision: 8,
            scale: 2,
          },
          {
            name: "description",
            type: "varchar",
            length: "60",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["accountId"],
            referencedTableName: "accounts",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "cards",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "accountId",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "type",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "number",
            type: "varchar",
            length: "16",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "cvv",
            type: "int",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["accountId"],
            referencedTableName: "accounts",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("people");
    await queryRunner.dropTable("accounts");
    await queryRunner.dropTable("transactions");
    await queryRunner.dropTable("cards");
  }
}
