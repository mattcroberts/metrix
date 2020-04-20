import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne } from 'typeorm';
import { Metric } from '../metrics/Metric.model';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class DataPoint {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((type) => Metric)
  @ManyToOne((type) => Metric, (metric) => metric.dataPoints, { onDelete: 'CASCADE' })
  metric: Metric;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;
}

@ObjectType()
@Entity()
export class RatingDataPoint extends DataPoint {
  @Field()
  @Column()
  rating: number;
}
