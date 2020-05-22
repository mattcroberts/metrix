import {MigrationInterface, QueryRunner} from "typeorm";

export class reminders1590164228987 implements MigrationInterface {
    name = 'reminders1590164228987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "device_registration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_479eed0c820e43787f9de9f753e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" ADD "reminder" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`CREATE TYPE "metric_reminderunit_enum" AS ENUM('day', 'hour', 'minute')`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" ADD "reminderUnit" "metric_reminderunit_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" ADD "reminderValue" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" ADD "reminderJobId" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "device_registration" ADD CONSTRAINT "FK_ff43dc67ad80f440f56f59818b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_registration" DROP CONSTRAINT "FK_ff43dc67ad80f440f56f59818b0"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" DROP COLUMN "reminderJobId"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" DROP COLUMN "reminderValue"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" DROP COLUMN "reminderUnit"`, undefined);
        await queryRunner.query(`DROP TYPE "metric_reminderunit_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" DROP COLUMN "reminder"`, undefined);
        await queryRunner.query(`DROP TABLE "device_registration"`, undefined);
    }

}
