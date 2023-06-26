import express from "express";
import cors from "cors";

import { pool } from "./database/db.js";
import productRoutes from "./routes/routesProducts.js";
import userRoutes from "./routes/routesUser.js";
import pay from "./routes/pay.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: true,
  })
);
app.use(express.json());
//Configurar CSP permitiendo la conexión a https://api.trongrid.io
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "connect-src 'self' https://r.stripe.com https://api.trongrid.io"
  );
  next();
});

app.use((req, res, next) => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  console.log(`${time} --- New request ${req.method}, on path ${req.path}`);
  next();
});

app.use(productRoutes);
app.use(userRoutes);
app.use("/", pay);

// Conexión a la base de datos
pool.on("connect", () => {
  console.log("Conexión exitosa a la base de datos");
});

// Obtiene todos los productos de la base de datos
const getAllProducts = async () => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const productsStock = {}; // Objeto para guardar el stock de los productos
const productMinStock = {}; // Objeto para guardar el stock mínimo de los productos

getAllProducts()
  .then((products) => {
    products.forEach((product) => {
      productsStock[product.id] = product.stock;
      productMinStock[product.id] = {
        stockmin: product.stockmin,
        nombre: product.nombre,
      };
    });

    console.log(productMinStock);

    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error al obtener los productos: ${error}`);
  });

export { productsStock, productMinStock };
// cambio se exporta el stock y el productominstock
