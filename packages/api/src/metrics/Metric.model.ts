import { Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany } from 'typeorm';
import { DataPoint } from '../datapoint/DataPoint.model';
import { ObjectType, Field, ID } from 'type-graphql';

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
  @OneToMany((type) => DataPoint, (dataPoint: DataPoint) => dataPoint.metric, { eager: true })
  dataPoints: DataPoint[];
}
