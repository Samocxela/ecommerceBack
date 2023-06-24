import { pool } from '../database/db.js';

const UserModel = {
  getAllUsers: async () => {
    try {
      const query = 'SELECT * FROM usuarios';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  getUser: async (id) => {
    try {
      const query = 'SELECT * FROM usuarios WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  createUser: async (user) => {
    try {
      const { nombre, password, direccion, telefono, email } = user;
      const query = 'INSERT INTO usuarios (nombre, password, direccion, telefono, email) VALUES ($1, $2, $3, $4, $5)';
      const values = [nombre, password, direccion, telefono, email];
      await pool.query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  updateUser: async (id, user) => {
    try {
      const { nombre, password, direccion, telefono, email } = user;
      const query = 'UPDATE usuarios SET nombre = $1, password = $2, direccion = $3, telefono = $4, email = $5 WHERE id = $6';
      const values = [nombre, password, direccion, telefono, email, id];
      await pool.query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  deleteUser: async (id) => {
    try {
      const query = 'DELETE FROM usuarios WHERE id = $1';
      const values = [id];
      await pool.query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default UserModel;
