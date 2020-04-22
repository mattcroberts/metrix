import { Field, ID, InterfaceType, ObjectType } from 'type-graphql';
import { ChildEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { Metric } from '../metrics/Metric.model';

@InterfaceType({ resolveType: (value) => value.constructor.name })
@Entity({ name: 'DataPoint' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class IDataPoint {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @Field((type) => Metric)
  @ManyToOne((type) => Metric, (metric) => metric.dataPoints, { onDelete: 'CASCADE' })
  metric: Metric;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;
}

@ChildEntity()
@ObjectType({ implements: IDataPoint })
export class DataPoint extends IDataPoint {}
