import { Entity, PrimaryGeneratedColumn, Column, Generated, ManyToOne } from 'typeorm';
import { Metric } from '../metrics/Metric.model';

@Entity()
export class DataPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @ManyToOne((type) => Metric, (metric) => metric.dataPoints)
  metric: Metric;
}
