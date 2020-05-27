import { Min, Max, IsInt } from 'class-validator';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { EntityManager, Repository } from 'typeorm';
import { InjectManager, InjectRepository } from 'typeorm-typedi-extensions';
import { Metric } from '../metrics/Metric.model';
import { ContextType } from '../types';
import { DataPoint } from './DataPoint.model';

@InputType()
class DataPointInput {
  @Field({ nullable: true })
  @Min(1)
  @Max(10)
  @IsInt()
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
  async recordDataPoint(
    @Ctx() { user }: ContextType,
    @Arg('metricId') metricId: string,
    @Arg('data', { nullable: true }) data: DataPointInput
  ) {
    const metric = await this.metricRepository.findOne({ id: metricId, user });

    const repo = this.manager.getRepository(metric.type);

    const dataPoint = await repo.save<any>((await repo.create(data)) as any);
    metric.dataPoints.push(dataPoint);

    return this.metricRepository.save(metric);
  }
}
