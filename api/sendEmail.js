// api/sendEmail.mjs
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: `${name} <${email}>`,
      to: 'studio.pt.ssi@gmail.com',
      subject: 'New Contact Message',
      text: message,
      html: `<p>${message}</p>`,
    };

    try {
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