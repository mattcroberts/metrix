import { Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { DataPoint } from '../datapoint/DataPoint.model';
import { ObjectType, Field, ID } from 'type-graphql';
import { Analysis } from '../analysis/Analysis.model';

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

  @Field((type) => [Analysis])
  @JoinTable()
  @ManyToMany((type) => Analysis)
  analyses: Analysis[];
}
