import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'p.ecommercedlt@gmail.com',
    pass: 'uxudsmblsczaqywk'
  }
});

export const sendMail = (product) => {
  transporter.sendMail({
    from: 'p.ecommercedlt@gmail.com',
    to: 'alexander.guerrero@yahoo.com',
    subject: 'Stock mínimo',
    text: `El producto con ID ${product.id} tiene un stock bajo. Por favor, actualiza el inventario.`
  })
    .then(() => {
      console.log('Correo electrónico enviado exitosamente.');
    })
    .catch((error) => {
      console.error('Error al enviar el correo electrónico:', error);
    });
};

