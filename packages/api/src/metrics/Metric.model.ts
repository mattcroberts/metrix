import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Analysis } from '../analysis/Analysis.model';
import { DataPoint } from '../datapoint/DataPoint.model';

export enum MetricType {
  DataPoint = 'DataPoint',
  RatingDataPoint = 'RatingDataPoint',
}

registerEnumType(MetricType, { name: 'MetricType' });

@Entity()
@ObjectType()
export class Metric {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @Field((type) => [DataPoint])
  @OneToMany((type) => DataPoint, (dataPoint: DataPoint) => dataPoint.metric, {
    eager: true,
    cascade: true,
  })
  dataPoints: DataPoint[];

  @Field((type) => MetricType)
  @Column({ type: 'enum', enum: MetricType, default: MetricType.DataPoint })
  type: MetricType;

  @Field((type) => [Analysis])
  @JoinTable()
  @ManyToMany((type) => Analysis)
  analyses: Analysis[];
}
