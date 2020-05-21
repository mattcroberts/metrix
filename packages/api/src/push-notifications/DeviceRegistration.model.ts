import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/User.model';

@Entity()
export class DeviceRegistration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @Column()
  token: string;
}
