import { config } from 'dotenv';

config();

export default {
  PORT: process.env.PORT ?? 5000,
  JWT_SECRET: process.env.JWT_SECRET ?? 'somethingsecret',
  DB_USERNAME: process.env.DB_USERNAME ?? '',
  DB_NAME: process.env.DB_NAME ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
 }