import { Field, ID } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeviceRegistration } from '../push-notifications/DeviceRegistration.model';

@Entity()
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
  devices: DeviceRegistration[];
}
