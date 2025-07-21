const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({
  // origin: 'https://evolution-git-main-aeroedgetechnologies-projects.vercel.app',
    origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Hardcoded Gmail SMTP for testing
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'govindayadav2478@gmail.com',
        pass: 'viar oqll myby jrgx', // <-- REPLACE with your real app password
      },
    });

    await transporter.sendMail({
      from: `Energy World Contact Form <govindayadav2478@gmail.com>`,
      to: 'energyworld.uae@gmail.com',
      subject: `New Contact Form Submission - Energy World`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`
    });

    res.json({ success: true });
  } catch (error) {
    const err = error;
    console.error('Contact form email error:', err && (err.message || err));
    if (err && err.stack) console.error(err.stack);
    res.status(500).json({ error: 'Failed to send message' });
  }
});
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 
