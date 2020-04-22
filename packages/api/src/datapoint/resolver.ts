import { Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';
import { DataPoint } from './DataPoint.model';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Metric } from '../metrics/Metric.model';
import { Repository } from 'typeorm';

@InputType()
class DataPointInput {
  @Field({ nullable: true })
  rating: number;
}

@Resolver((of) => DataPoint)
export class DataPointResolver {
  @InjectRepository(Metric)
  private metricRepository: Repository<Metric>;

  @InjectRepository(DataPoint)
  private dataPointRepository: Repository<DataPoint>;

  @Mutation((returns) => Metric)
  async recordDataPoint(@Arg('metricId') metricId: string, @Arg('data', { nullable: true }) data: DataPointInput) {
    const metric = await this.metricRepository.findOne({ id: metricId });
    const dataPoint = new DataPoint();

    await this.dataPointRepository.save(dataPoint);
    metric.dataPoints.push(dataPoint);

    return this.metricRepository.save(metric);
  }
}
