import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import 'dotenv/config';

// Create the connection pool
const poolConnection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'housinglord',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create the drizzle instance
export const db = drizzle(poolConnection);

// Test the connection
export async function testConnection() {
  try {
    const [rows] = await poolConnection.execute('SELECT 1 as test');
    console.log('Database connection successful!');
    return rows;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export default db;