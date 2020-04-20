import { Entity, OneToMany, PrimaryGeneratedColumn, JoinTable, ManyToMany, Column } from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { Metric } from '../metrics/Metric.model';

export enum ChartType {
  MARKER = 'MARKER',
  LINE = 'LINE',
}

registerEnumType(ChartType, { name: 'ChartType' });

@Entity()
@ObjectType()
export class Analysis {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field((type) => [ChartType])
  // @Column()
  chartType: ChartType[];

  @Field((type) => [Metric])
  @ManyToMany((type) => Metric)
  @JoinTable()
  metrics: Metric[];
}
