require("dotenv").config();
const nodemailer = require('nodemailer');


const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.EMAIL_HOST,
            // port: process.env.EMAIL_PORT,
            service:'gmail',
            auth: {
                user:'sudaisali420@gmail.com',
                pass: 'xnodudrjmwqhuuzd '
                // user: process.env.EMAIL_USER,
                // pass: process.env.EMAIL_PASSWORD
            }
        });

        const emailOptions = {
            from: 'Auth&Auth <sudaisali420@gmail.com>',
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        await transporter.sendMail(emailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw error; 
    }
};

module.exports = { sendEmail };
