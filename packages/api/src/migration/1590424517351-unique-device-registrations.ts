import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueDeviceRegistrations1590424517351 implements MigrationInterface {
    name = 'uniqueDeviceRegistrations1590424517351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_registration" ADD CONSTRAINT "UQ_ab0b8cac8fa72228c858b80483d" UNIQUE ("token")`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device_registration" DROP CONSTRAINT "UQ_ab0b8cac8fa72228c858b80483d"`, undefined);
    }

}
