import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/User.model';

@Entity()
export class DeviceRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user) => user.devices)
  user: User;

  @Column()
  token: string;
}
