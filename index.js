import express from "express";
import cors from "cors";

//import dbConfig from "./database/db.js";
import productRoutes from "./routes/routesProducts.js";
import userRoutes from "./routes/routesUser.js";
import pay from "./routes/pay.js";
import pg from 'pg';
const { Pool } = pg;

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
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.on("connect", () => {
  console.log("Conexión exitosa a la base de datos");
});

// Obtiene todos los productos de la base de datos
const getAllProducts = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM productos");
    return result.rows;
  } finally {
    client.release();
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
