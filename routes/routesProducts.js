import express from "express";
import { bookProduct, buyProducts, getAllProducts, getProduct, createProduct, updateProducts, deleteProduct } from "../controllers/ProductControllers.js";

const router = express.Router();

// Generación de rutas para usar la API creada para interactuar con la base de datos
// Diferentes rutas a usar con las diferentes funcionalidades
router.get('/productos', getAllProducts);
router.get('/productos/:id', getProduct);
router.put('/productos/buy', buyProducts);
router.get('/productos/book/:id', bookProduct);

router.post('/productos', createProduct);
router.put('/productos/:id', updateProducts);
router.delete('/productos/:id', deleteProduct);

export default router;
