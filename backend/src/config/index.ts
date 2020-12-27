import { config } from 'dotenv';

config();

export default {
  PORT: process.env.PORT ?? 5000,
  DB_USERNAME: process.env.DB_USERNAME ?? '',
  DB_NAME: process.env.DB_NAME ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
 }