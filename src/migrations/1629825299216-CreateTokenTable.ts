import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTokenTable1629825299216 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "token",
      columns: [
        {
          name: "id",
          type: "int8",
          isPrimary: true,
          isGenerated: true
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
          name: "created_at",
          type: "timestamp",
          default: 'now()'
        }
      ]
    }), true)

    await queryRunner.createIndex("token", new TableIndex({
      name: "IDX_USER_TOKEN",
      columnNames: ["fcm_token", "user_id"],
      isUnique: true
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("token", "IDX_USER_TOKEN");
    await queryRunner.dropTable("token");
  }

}
