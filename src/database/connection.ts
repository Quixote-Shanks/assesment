import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const connect = async (): Promise<Pool> => {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URI,
    });

    await pool.connect();
    console.log('Connected to the database');
    return pool;
  } catch (error) {
    console.error('Failed to connect to the database', error);
    throw error;
  }
}