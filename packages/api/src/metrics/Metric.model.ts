import { Entity, PrimaryGeneratedColumn, Column, Generated, OneToMany } from 'typeorm';
import { DataPoint } from '../datapoint/DataPoint.model';

@Entity()
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @OneToMany((type) => DataPoint, (dataPoint: DataPoint) => dataPoint.metric, { eager: true })
  dataPoints: DataPoint[];
}
