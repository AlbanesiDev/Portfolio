const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
})

const nodeEmail = process.env.NODEMAILER_EMAIL;
const nodeEmailTo = process.env.NODEMAILER_EMAIL_TO;
const nodePassword = process.env.NODEMAILER_PASSWORD;

app.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: nodeEmail,
            pass: nodePassword
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: nodeEmailTo,
        subject: `Message from ${req.body.email}`,
        text: req.body.textArea
    } 

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send('error');
        } else {
            res.send('success');
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})