const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración del transportador de nodemailer con las credenciales y el servidor de correo
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Servidor SMTP del proveedor de correo
    port: process.env.EMAIL_PORT, // Puerto del servidor SMTP
    secure: true, // Utilizar SSL/TLS para la conexión segura
    auth: {
        user: process.env.EMAIL_USER, // Dirección de correo electrónico del remitente
        pass: process.env.EMAIL_PASS // Contraseña del remitente
    }
});

/**
 * Enviar un correo electrónico.
 * @param {string} to - Dirección de correo electrónico del destinatario.
 * @param {string} subject - Asunto del correo electrónico.
 * @param {string} text - Texto del cuerpo del correo electrónico.
 */
const sendMail = async (to, subject, text) => {
    // Opciones del correo electrónico
    const mail_options = {
        from: process.env.EMAIL_USER, // Dirección de correo electrónico del remitente
        to: to, // Dirección de correo electrónico del destinatario
        subject: subject, // Asunto del correo electrónico
        text: text, // Texto del cuerpo del correo electrónico
    };

    // Enviar el correo electrónico
    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error); // Manejo de errores en el envío
        } else {
            console.log('Correo enviado:', info.response); // Confirmación de envío exitoso
        }
    });
}

module.exports = sendMail;
