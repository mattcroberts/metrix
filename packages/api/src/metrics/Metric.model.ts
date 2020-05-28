import { createUnionType, Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Analysis } from '../analysis/Analysis.model';
import { DataPoint, IDataPoint } from '../datapoint/DataPoint.model';
import { RatingDataPoint } from '../datapoint/RatingDataPoint.model';
import { User } from '../users/User.model';

export enum MetricType {
  DataPoint = 'DataPoint',
  RatingDataPoint = 'RatingDataPoint',
}
registerEnumType(MetricType, { name: 'MetricType' });

export enum ReminderUnit {
  Day = 'day',
  Hour = 'hour',
  Minute = 'minute',
}

registerEnumType(ReminderUnit, { name: 'ReminderUnit' });

export const DataPointUnion = createUnionType({
  name: 'DataPointUnion',
  types: () => [DataPoint, RatingDataPoint],
  resolveType: (value, context, info) => {
    if ('rating' in value) {
      return 'RatingDataPoint';
    }

    return 'DataPoint';
  },
});

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

  @Field((type) => [DataPointUnion])
  @OneToMany((type) => IDataPoint, (dataPoint: DataPoint | RatingDataPoint) => dataPoint.metric, {
    eager: true,
    cascade: true,
  })
  dataPoints: DataPoint[] | RatingDataPoint[];

  @Field((type) => MetricType)
  @Column({ type: 'enum', enum: MetricType, default: MetricType.DataPoint })
  type: MetricType;

  @Field((type) => [Analysis])
  @JoinTable()
  @ManyToMany((type) => Analysis)
  analyses: Analysis[];

  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;

  @Field()
  @Column({ default: false })
  reminder: boolean;

  @Field(() => ReminderUnit, { nullable: true })
  @Column({ type: 'enum', enum: ReminderUnit, nullable: true })
  reminderUnit: ReminderUnit;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reminderValue: number;

  @Field({ nullable: true })
  @Column({ default: 0 })
  reminderMinute: number;

  @Field({ nullable: true })
  @Column({ default: 0 })
  reminderHour: number;

  @Column({ nullable: true })
  reminderJobId: string;
}
