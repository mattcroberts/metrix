import { Connection } from 'typeorm';
import { User } from './users/User.model';

export interface ContextType {
  user: User;
}
