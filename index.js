// index.js
const express    = require('express');
const path       = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// 1) JSON parser needed for our POST /contact
app.use(express.json());

// 2) Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public')));

// 3) Existing mind-reader endpoint
app.get('/guess/:number', (req, res) => {
  const userNumber = req.params.number;
  setTimeout(() => {
    res.send({ guess: userNumber });
  }, 10000);
});

// 4) SMTP transporter using ENV vars
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,  // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Optional startup check
transporter.verify(err => {
  if (err) console.error('SMTP setup error:', err);
  else     console.log('SMTP is ready to send mail');
});

// 5) New POST /contact for optional emails
app.post('/contact', async (req, res) => {
  const { to, number } = req.body;
  if (!to || !number) {
    return res.status(400).json({ success: false, error: 'Missing to or number' });
  }
  try {
    await transporter.sendMail({
      from: `"Mind Reader" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Your Mind-Reader Result',
      text: `Hey there!

We just read your mind and guessed you were thinking of the number ${number}.

Thanks for trying our mind-reader!`
    });
    return res.json({ success: true });
  } catch (err) {
    console.error('Error sending mail:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 6) Fallback for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 7) Launch
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
