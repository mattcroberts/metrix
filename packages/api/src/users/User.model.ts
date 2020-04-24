import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID } from 'type-graphql';

@Entity()
export class User {
  @Field(ID)
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;
}
