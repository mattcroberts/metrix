import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { DataPoint } from '../datapoint/DataPoint.model';
import { Metric } from './Metric.model';

@Resolver((of) => Metric)
export class MetricResolver {
  @InjectRepository(Metric)
  private metricRepository: Repository<Metric>;

  @InjectRepository(DataPoint)
  private dataPointRepository: Repository<DataPoint>;

  @Query((returns) => [Metric])
  allMetrics(): Promise<Metric[]> {
    return this.metricRepository.find();
  }

  @Query((returns) => Metric)
  metricById(@Arg('id') id: string) {
    return this.metricRepository.findOne({ id });
  }

  @Mutation((returns) => Metric)
  async createMetric(@Arg('name') name: string) {
    console.log('creating');
    const newMetric = new Metric();
    newMetric.name = name;
    const result = await this.metricRepository.save(newMetric);

    console.log('Created Metric', result);
    return result;
  }

  @Mutation((returns) => Metric)
  async recordMetric(@Arg('metricId') metricId: string) {
    const metric = await this.metricRepository.findOne({ id: metricId });
    const dataPoint = new DataPoint();
    console.log({ metric, dataPoint });
    await this.dataPointRepository.save(dataPoint);
    metric.dataPoints.push(dataPoint);

    return this.metricRepository.save(metric);
  }
}
