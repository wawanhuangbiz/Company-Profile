// backend/server.js

// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});



// Define the /send-email route
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'studio.pt.ssi@gmail.com', // Your email where you want to receive messages
        subject: `New message from ${name}`,
        text: message,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log the error
            return res.status(500).json({ success: false, error: error.message });
        }
        res.status(200).json({ success: true, messageId: info.messageId });
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})})
