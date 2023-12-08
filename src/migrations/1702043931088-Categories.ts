import { MigrationInterface, QueryRunner } from "typeorm";

export class Categories1702043931088 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO product_categories (id, name, available, is_deletable, created_at, updated_at) 
        VALUES (
        '7c8f73b9-b5aa-4e37-b594-9e4d8f91627e',
        'Sem categoria',
        1,
        0,
        '2023-12-06 23:28:20',
        '2023-12-06 23:28:20'
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
