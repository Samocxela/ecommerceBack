import nodemailer from 'nodemailer'; //se improta la libreria nodemailer que permite el facil envio de correo

//El transportador, simplemente una en la cual SMTP protocolo simple de transferencia de correo
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'p.ecommercedlt@gmail.com',
        pass: 'uxudsmblsczaqywk'
    }
});

//funcion que envia el correo con el contenido usando la libreria de mailer

export const sendMail = prod => {
    transporter.sendMail({
        from: "p.ecommercedlt@gmail.com",
        to: "alexander.guerrero@yahoo.com",
        subject: "Stock minimo",
        text: `El siguiente producto con Id ${prod.id}. esta casi vacio favor actualizar inventario`
    }).then(console.info)
    .catch(console.catch)
}

