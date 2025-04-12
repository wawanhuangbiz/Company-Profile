// api/sendEmail.js
const nodemailer = require('nodemailer');

exports.default = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Set up the email transport configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service provider
      auth: {
        user:process.env.EMAIL-USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Set up the email options
    const mailOptions = {
      from: name + ' <' + email + '>', // Sender address
      to: 'studio.pt.ssi@gmail.com', // Recipient address
      subject: 'New Contact Message', // Subject line
      text: message, // Plain text body
      html: `<p>${message}</p>`, // HTML body
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};