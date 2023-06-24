// Importar las dependencias necesarias
const request = require('supertest');
const app = require('../main'); // Importar tu archivo principal de la aplicación (donde se crea y configura la aplicación de Express)

// Test para obtener todos los productos
describe('GET /productos', () => {
  it('debería devolver todos los productos', async () => {
    const response = await request(app).get('/productos');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Aquí puedes agregar más expectativas para verificar los datos recibidos en la respuesta
  });
});

// Test para obtener un producto específico
describe('GET /productos/:id', () => {
  it('debería devolver un producto específico', async () => {
    const response = await request(app).get('/productos/1'); // Reemplaza '1' con el ID del producto que deseas obtener
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    // Aquí puedes agregar más expectativas para verificar los datos recibidos en la respuesta
  });
});

// Test para crear un producto
describe('POST /productos', () => {
  it('debería crear un nuevo producto', async () => {
    const newProduct = {
      nombre: 'Producto de prueba',
      descripcion: 'Descripción del producto de prueba',
      precio: 9.99,
      stock: 10,
    };
    const response = await request(app).post('/productos').send(newProduct);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'registro creado' });
    // Aquí puedes agregar más expectativas para verificar los datos recibidos en la respuesta
  });
});

// Test para actualizar un producto
describe('PUT /productos/:id', () => {
  it('debería actualizar un producto existente', async () => {
    const updatedProduct = {
      nombre: 'Producto actualizado',
      descripcion: 'Nueva descripción del producto',
    };
    const response = await request(app).put('/productos/1').send(updatedProduct); // Reemplaza '1' con el ID del producto que deseas actualizar
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'registro actualizado' });
    // Aquí puedes agregar más expectativas para verificar los datos recibidos en la respuesta
  });
});

// Test para eliminar un producto
describe('DELETE /productos/:id', () => {
  it('debería eliminar un producto existente', async () => {
    const response = await request(app).delete('/productos/1'); // Reemplaza '1' con el ID del producto que deseas eliminar
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'registro borrado' });
    // Aquí puedes agregar más expectativas para verificar los datos recibidos en la respuesta
  });
});
