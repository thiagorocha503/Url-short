import { DB_URI } from '@config';
import { ConnectOptions } from 'mongoose';

type dbConnection_type = { url: string; options: ConnectOptions };
export const dbConnection: dbConnection_type = {
  url: DB_URI,
  options: {},
};
