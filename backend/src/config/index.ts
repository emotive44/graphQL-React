import { config } from 'dotenv';

config();

export default {
  DB_USERNAME: process.env.D ?? '',
  DB_NAME: process.env.DB_NAME ?? '',
  DB_PASSWORD: process.env.DB_PASSWORD ?? '',
 }