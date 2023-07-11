import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, SERVER_HOST, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_URI } = process.env;
export const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX) || 5;
export const RATE_LIMIT_WINDOWS_MS = parseInt(process.env.RATE_LIMIT_WINDOWS_MS) || 1000  ;
