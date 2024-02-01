const express = require("express");
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});

module.exports = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: req.body.email,
            to: process.env.NODEMAILER_EMAIL_TO,
            subject: `Message from ${req.body.email}`,
            text: req.body.textArea
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, info });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message, stack: error.stack });
    }
};

app.listen(PORT);