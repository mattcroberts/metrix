import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceRegistration } from '../push-notifications/DeviceRegistration.model';

@Entity()
@ObjectType()
export class User {
  @Field(ID)
  @PrimaryGeneratedColumn('uuid')
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

  @OneToMany((type) => DeviceRegistration, (device) => device.user)
  @Field((type) => [DeviceRegistration])
  devices: DeviceRegistration[];
}
