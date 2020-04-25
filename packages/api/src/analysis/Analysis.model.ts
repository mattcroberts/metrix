import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Metric } from '../metrics/Metric.model';
import { User } from '../users/User.model';

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

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;
}
