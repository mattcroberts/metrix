import { MigrationInterface, QueryRunner } from 'typeorm';
import { Metric } from '../metrics/Metric.model';
import { date } from 'faker';
import { DataPoint } from '../datapoint/DataPoint.model';
import { Analysis } from '../analysis/Analysis.model';

const data = {
  analysis: [
    {
      id: 'fd6d0ac9-6750-4dae-ace8-4032425f2e78',
      name: 'Analysis 1',
      metrics: [
        {
          id: '4fb9b2ab-cd50-4362-873d-9d2bf624c20a',
          name: 'I had a symptom',
          dataPoints: Array.from(new Array(5)).map(() => ({ datetime: date.recent(365).toISOString() })),
        },
        {
          id: '4b0660f4-fde8-452a-92fe-211e363751b5',
          name: 'I had a hot flush',
          dataPoints: Array.from(new Array(20)).map(() => ({ datetime: date.recent(365).toISOString() })),
        },
      ],
    },
  ],
};

const flat = (arr) => [].concat(...arr);
export class seed1587048180355 implements MigrationInterface {
  public async up({ connection }: QueryRunner): Promise<any> {
    const analyses = await Promise.all(
      data.analysis.map((analysis) => connection.getRepository(Analysis).create(analysis))
    );

    await connection.getRepository(Metric).save(flat(analyses.map(({ metrics }) => metrics)));
    await connection
      .getRepository(DataPoint)
      .save(flat(analyses.map(({ metrics }) => metrics.map(({ dataPoints }) => dataPoints))));
    await connection.getRepository(Analysis).save(analyses);
  }

  public async down({ connection }: QueryRunner): Promise<any> {
    const metricRepo = connection.getRepository(Metric);
    await metricRepo.remove(
      await metricRepo.findByIds(flat(data.analysis.map(({ metrics }) => metrics.map(({ id }) => id))))
    );

    await connection
      .getRepository(Analysis)
      .createQueryBuilder()
      .delete()
      .whereInIds(data.analysis.map((analysis) => analysis.id))
      .execute();
  }
}
