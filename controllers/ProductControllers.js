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
    const { precio, stock, stockmax, stockmin } = req.body;
    await ProductModel.updateProduct(productId, { precio, stock, stockmax, stockmin });
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
    if (typeof req.body !== 'object') {
      throw new Error('Invalid request body');
    }

    console.log("llego ")
    const products = req.body;

    console.log(req.body)
    const message = await ProductModel.buyProducts(products);
    res.json({ message: message });

  } catch (error) {
    res.json({ message: error.message });
  }
};

// Agregar un producto al carrito
export const addToCart = async (req, res) => {
  try {

    console.log(req.params.id)
    console.log(req.body.quantity)

    const productId = req.params.id;
    console.log("Este es el producto id"+productId)
    const quantity = req.body.quantity;

    

    const message = await ProductModel.addToCart(productId, quantity);
    res.json({ message });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Remover un producto del carrito
export const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const quantity = req.body.quantity;
    const message = await ProductModel.removeFromCart(productId, quantity);
    res.json({ message });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const bookProduct = async (req, res) => {
  try {
      console.log(productsStock);
      if (req.query.f === 'unbook'){
          productsStock[req.params.id]++;
          return res.json('Unbooked');
      } else if (req.query.f === 'book') {
          if (productsStock[req.params.id] == 0) return res.json('Stockout')//en caso de que el producto sea igual a 0 se notifica que se acabo
          productsStock[req.params.id]--;
          return res.json('Booked');
      } 
      res.status(400).json('Bad request');
  } catch (error) {
      res.json({message: error.message});
  }
}
