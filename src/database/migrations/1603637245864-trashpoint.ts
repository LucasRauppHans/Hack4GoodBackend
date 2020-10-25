import {MigrationInterface, QueryRunner} from "typeorm";

export class trashpoint1603637245864 implements MigrationInterface {
    name = 'trashpoint1603637245864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trashpoint" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "reporterName" varchar NOT NULL, "reporterContact" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "description" integer NOT NULL, "assignee" varchar NOT NULL, "assigneeContact" varchar NOT NULL, "severity" varchar NOT NULL, "progress" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "trashpoint_id" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "trashpoint_id" integer, CONSTRAINT "FK_f01d8f8dedbaed13b85c5e9bd87" FOREIGN KEY ("trashpoint_id") REFERENCES "trashpoint" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_images"("id", "path", "trashpoint_id") SELECT "id", "path", "trashpoint_id" FROM "images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "temporary_images" RENAME TO "images"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" RENAME TO "temporary_images"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "trashpoint_id" integer)`);
        await queryRunner.query(`INSERT INTO "images"("id", "path", "trashpoint_id") SELECT "id", "path", "trashpoint_id" FROM "temporary_images"`);
        await queryRunner.query(`DROP TABLE "temporary_images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "trashpoint"`);
    }

}
