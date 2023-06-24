import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  // Configuración de la conexión a la base de datos
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

export { pool };