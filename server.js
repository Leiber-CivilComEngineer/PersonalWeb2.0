require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// staic folder
app.use(express.static('public'));

// parse
app.use(express.urlencoded({ extended: false }));

// send email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SENDER, // generated ethereal user
            pass: process.env.EMAIL_PASS  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    const mailOptions = {
        from: `"LeiberWebsite Contact" <${process.env.EMAIL_SENDER}>`, 
        to: process.env.EMAIL_RECEIVER, 
        subject: 'LeiberWebsite Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

// start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
