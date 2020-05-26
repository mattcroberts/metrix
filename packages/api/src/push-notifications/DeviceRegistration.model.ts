import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/User.model';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export class DeviceRegistration {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne((type) => User, (user) => user.devices)
  @Field((type) => User)
  user: User;

  @Column({ unique: true })
  @Field()
  token: string;
}
