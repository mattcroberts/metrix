import { Resolver, Mutation, Arg, InputType, Field, createUnionType } from 'type-graphql';
import { DataPoint, IDataPoint } from './DataPoint.model';
import { InjectRepository, InjectManager } from 'typeorm-typedi-extensions';
import { Metric, DataPointUnion } from '../metrics/Metric.model';
import { Repository, EntityManager } from 'typeorm';
import { RatingDataPoint } from './RatingDataPoint.model';

@InputType()
class DataPointInput {
  @Field({ nullable: true })
  rating: number;
}

@Resolver()
export class DataPointResolver {
  @InjectRepository(Metric)
  private metricRepository: Repository<Metric>;

  @InjectRepository(DataPoint)
  private dataPointRepository: Repository<DataPoint>;

  @InjectManager()
  private manager: EntityManager;

  @Mutation((returns) => Metric)
  async recordDataPoint(@Arg('metricId') metricId: string, @Arg('data', { nullable: true }) data: DataPointInput) {
    const metric = await this.metricRepository.findOne({ id: metricId });

    const repo = this.manager.getRepository(metric.type);

    const dataPoint = await repo.save<any>((await repo.create(data)) as any);
    metric.dataPoints.push(dataPoint);

    return this.metricRepository.save(metric);
  }
}
