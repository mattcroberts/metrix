import {MigrationInterface, QueryRunner} from "typeorm";

export class reminderTimes1590665098982 implements MigrationInterface {
    name = 'reminderTimes1590665098982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "metric" ADD "reminderMinute" integer NOT NULL DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" ADD "reminderHour" integer NOT NULL DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "metric" DROP COLUMN "reminderHour"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" DROP COLUMN "reminderMinute"`, undefined);
    }

}
