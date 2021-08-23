import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";
// import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class CreateTokenTable1629023818790 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "token",
      columns: [
        {
          name: "id",
          type: "int8",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment"
        },
        {
          name: "fcm_token",
          type: "varchar",
          isNullable: false
        },
        {
          name: "user_id",
          type: "varchar",
          isNullable: false
        },
        {
          name: "bundle_id",
          type: "varchar",
          isNullable: true
        },
        {
          name: "platform",
          type: "varchar(8)",
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true);

    const tokenUniqueConstraint = new TableUnique({ name: 'user_token', columnNames: ["fcm_token", "user_id"] });
    await queryRunner.createUniqueConstraint("token", tokenUniqueConstraint);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("token");
  }

}
