import { Field, ObjectType } from 'type-graphql';
import { ChildEntity, Column } from 'typeorm';
import { IDataPoint } from './DataPoint.model';

@ObjectType({ implements: IDataPoint })
@ChildEntity()
export class RatingDataPoint extends IDataPoint {
  @Field()
  @Column()
  rating: number;
}
