import { pool } from "../database/db.js";

const ProductModel = {
  // Obtener todos los productos
  getAllProducts: async () => {
    try {
      const query = 'SELECT * FROM productos';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  // Obtener un producto por su ID
  getProduct: async (id) => {
    try {
      const query = 'SELECT * FROM productos WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  // Crear un nuevo producto
  createProduct: async (product) => {
    try {
      const { nombre, descripcion, precio, stock, stockmax, stockmin, img } = product;
      const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, stockmax, stockmin, img) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const values = [nombre, descripcion, precio, stock, stockmax, stockmin, img];
      await pool.query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  // Actualizar un producto por su ID
  updateProduct: async (id, product) => {
    try {
      const { precio, stock, stockmax, stockmin } = product;
      const query = 'UPDATE productos SET precio = $1, stock = $2, stockmax = $3, stockmin = $4 WHERE id = $5';
      const values = [precio, stock, stockmax, stockmin, id];
      await pool.query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Agregar un producto al carrito (actualizar el stock)
  addToCart: async (productId, quantity) => {
    try {
      const query = 'UPDATE productos SET stock = stock - $1 WHERE id = $2';
      const values = [quantity, productId];
      await pool.query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Remover un producto del carrito (actualizar el stock)
  removeFromCart: async (productId, quantity) => {
    try {
      const query = 'UPDATE productos SET stock = stock + $1 WHERE id = $2';
      const values = [quantity, productId];
      await pool.query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  // Eliminar un producto por su ID
  deleteProduct: async (id) => {
    try {
      const query = 'DELETE FROM productos WHERE id = $1';
      const values = [id];
      await pool.query(query, values);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  // Reservar o liberar la reserva de un producto
  bookProduct: async (id, action) => {
    try {
      const query = 'UPDATE productos SET stock = stock - 1 WHERE id = $1';
      const values = [id];
      console.log(id, action);
      if (action === 'unbook') {
        const unbookQuery = 'UPDATE productos SET stock = stock + 1 WHERE id = $1';
        await pool.query(unbookQuery, values);
        return 'Unbooked';
      } else if (action === 'book') {
        const checkStockQuery = 'SELECT stock FROM productos WHERE id = $1';
        const checkStockResult = await pool.query(checkStockQuery, values);
        const stock = checkStockResult.rows[0].stock;
        if (stock === 0) {
          return 'Stockout';
        }
        await pool.query(query, values);
        return 'Booked';
      } else {
        throw new Error('Invalid action');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  // Realizar la compra de varios productos a la vez
  buyProducts: async (products) => {
    try {
      await pool.query('BEGIN');
      const promises = products.map(async (product) => {
        const { id, quantity } = product;
        const updateContentQuery = 'UPDATE productos SET stock = stock - $1 WHERE id = $2';
        const values = [quantity, id];
        await pool.query(updateContentQuery, values);
        const checkStockQuery = 'SELECT stockmin FROM productos WHERE id = $1';
        const checkStockResult = await pool.query(checkStockQuery, [id]);
        const stockmin = checkStockResult.rows[0].stockmin;
        if (stockmin >= (stock - quantity)) {
          const sendMailQuery = 'SELECT * FROM usuarios WHERE stockmin >= $1';
          const sendMailResult = await pool.query(sendMailQuery, [id]);
          // Lógica para enviar correo
        }
      });
      await Promise.all(promises);
      await pool.query('COMMIT');
      return 'Successful purchase';
    } catch (error) {
      await pool.query('ROLLBACK');
      throw new Error(error.message);
    }
  },
};

export default ProductModel;


