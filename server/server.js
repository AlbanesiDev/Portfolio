const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yourEmail',
            pass: 'yourPassword'
        }
    })

    const mailOptions = {
        frrom: req.body.email,
        to: 'joaquinalbanesidev@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`, 
        text: req.body.message
    } 

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})