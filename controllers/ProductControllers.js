import ProductModel from "../models/ProductModel.js";

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Obtener un producto por su ID
export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.getProduct(productId);
    if (product) {
      res.json(product);
    } else {
      res.json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, stockmax, stockmin, img } = req.body;
    await ProductModel.createProduct({ nombre, descripcion, precio, stock, stockmax, stockmin, img });
    res.json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un producto por su ID
export const updateProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const { nombre, descripcion, precio, stock, stockmax, stockmin, img } = req.body;
    await ProductModel.updateProduct(productId, { nombre, descripcion, precio, stock, stockmax, stockmin, img });
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar un producto por su ID
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await ProductModel.deleteProduct(productId);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.json({ message: error.message });
  }
};
// Comprar productos
export const buyProducts = async (req, res) => {
  try {
    const products = req.body;
    const message = await ProductModel.buyProducts(products);
    res.json({ message: message });
  } catch (error) {
    res.json({ message: error.message });
  }
};
// Reservar o cancelar la reserva de un producto
export const bookProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const action = req.query.f; // 'book' para reservar, 'unbook' para cancelar la reserva
    let message;
    if (action === 'book') {
      message = await ProductModel.bookProduct(productId, 'book');
    } else if (action === 'unbook') {
      message = await ProductModel.bookProduct(productId, 'unbook');
    } else {
      throw new Error('Acción no válida');
    }
    res.json({ message });
  } catch (error) {
    res.json({ message: error.message });
  }
};

