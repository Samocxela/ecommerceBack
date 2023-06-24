import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();


const pool = new Pool({
  // Configuración de la conexión a la base de datos

  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
 /* user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,*/
});

export { pool };