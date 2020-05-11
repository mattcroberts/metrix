import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1589196040349 implements MigrationInterface {
    name = 'initial1589196040349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DataPoint" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "datetime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "rating" integer, "type" character varying NOT NULL, "metricId" uuid, CONSTRAINT "PK_42a40b558c81aa0b40572dc8894" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b132b2d101f845c7a7eef55a2d" ON "DataPoint" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "metric_type_enum" AS ENUM('DataPoint', 'RatingDataPoint')`, undefined);
        await queryRunner.query(`CREATE TABLE "metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "datetime" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "type" "metric_type_enum" NOT NULL DEFAULT 'DataPoint', "userId" uuid, CONSTRAINT "PK_7d24c075ea2926dd32bd1c534ce" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "analysis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_300795d51c57ef52911ed65851f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "metric_analyses_analysis" ("metricId" uuid NOT NULL, "analysisId" uuid NOT NULL, CONSTRAINT "PK_776b65adf3608c2e84a87e248d2" PRIMARY KEY ("metricId", "analysisId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e2e59112be83e2ae229e84f1d6" ON "metric_analyses_analysis" ("metricId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1712e5794173cd5cd3cbcc98c0" ON "metric_analyses_analysis" ("analysisId") `, undefined);
        await queryRunner.query(`CREATE TABLE "analysis_metrics_metric" ("analysisId" uuid NOT NULL, "metricId" uuid NOT NULL, CONSTRAINT "PK_6ff5e0c202718d63c0fd86974b8" PRIMARY KEY ("analysisId", "metricId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_2e42868dc531eb6a2356d9ae58" ON "analysis_metrics_metric" ("analysisId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c85aca872ccc33c376c1d5131c" ON "analysis_metrics_metric" ("metricId") `, undefined);
        await queryRunner.query(`ALTER TABLE "DataPoint" ADD CONSTRAINT "FK_3edb71dd108efe18f0f59d7a330" FOREIGN KEY ("metricId") REFERENCES "metric"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" ADD CONSTRAINT "FK_3557f398f4e0fcde0ac3ade2493" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "analysis" ADD CONSTRAINT "FK_b17befb30bc9daf5b0fedbb283a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "metric_analyses_analysis" ADD CONSTRAINT "FK_e2e59112be83e2ae229e84f1d6c" FOREIGN KEY ("metricId") REFERENCES "metric"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "metric_analyses_analysis" ADD CONSTRAINT "FK_1712e5794173cd5cd3cbcc98c00" FOREIGN KEY ("analysisId") REFERENCES "analysis"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "analysis_metrics_metric" ADD CONSTRAINT "FK_2e42868dc531eb6a2356d9ae587" FOREIGN KEY ("analysisId") REFERENCES "analysis"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "analysis_metrics_metric" ADD CONSTRAINT "FK_c85aca872ccc33c376c1d5131ca" FOREIGN KEY ("metricId") REFERENCES "metric"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "analysis_metrics_metric" DROP CONSTRAINT "FK_c85aca872ccc33c376c1d5131ca"`, undefined);
        await queryRunner.query(`ALTER TABLE "analysis_metrics_metric" DROP CONSTRAINT "FK_2e42868dc531eb6a2356d9ae587"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric_analyses_analysis" DROP CONSTRAINT "FK_1712e5794173cd5cd3cbcc98c00"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric_analyses_analysis" DROP CONSTRAINT "FK_e2e59112be83e2ae229e84f1d6c"`, undefined);
        await queryRunner.query(`ALTER TABLE "analysis" DROP CONSTRAINT "FK_b17befb30bc9daf5b0fedbb283a"`, undefined);
        await queryRunner.query(`ALTER TABLE "metric" DROP CONSTRAINT "FK_3557f398f4e0fcde0ac3ade2493"`, undefined);
        await queryRunner.query(`ALTER TABLE "DataPoint" DROP CONSTRAINT "FK_3edb71dd108efe18f0f59d7a330"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c85aca872ccc33c376c1d5131c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_2e42868dc531eb6a2356d9ae58"`, undefined);
        await queryRunner.query(`DROP TABLE "analysis_metrics_metric"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1712e5794173cd5cd3cbcc98c0"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e2e59112be83e2ae229e84f1d6"`, undefined);
        await queryRunner.query(`DROP TABLE "metric_analyses_analysis"`, undefined);
        await queryRunner.query(`DROP TABLE "analysis"`, undefined);
        await queryRunner.query(`DROP TABLE "metric"`, undefined);
        await queryRunner.query(`DROP TYPE "metric_type_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b132b2d101f845c7a7eef55a2d"`, undefined);
        await queryRunner.query(`DROP TABLE "DataPoint"`, undefined);
    }

}
