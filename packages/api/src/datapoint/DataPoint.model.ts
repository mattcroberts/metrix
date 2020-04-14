import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne } from 'typeorm';
import { Metric } from '../metrics/Metric.model';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class DataPoint {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @Field((type) => Metric)
  @ManyToOne((type) => Metric, (metric) => metric.dataPoints)
  metric: Metric;
}
