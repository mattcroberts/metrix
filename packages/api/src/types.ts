import { Connection } from 'typeorm';

export interface ContextType {
  connection: Connection;
}
