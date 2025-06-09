// index.js
const express    = require('express');
const path       = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// 1) Parse JSON bodies (for POST /contact)
app.use(express.json());

// 2) Serve your static front-end
app.use(express.static(path.join(__dirname, 'public')));

// 3) Your existing mind-reader API
app.get('/guess/:number', (req, res) => {
  const userNumber = req.params.number;
  // Simulate thinking for 10s
  setTimeout(() => {
    res.send({ guess: userNumber });
  }, 10000);
});

// 4) Configure Nodemailer (set these env vars before start):
//    SMTP_USER, SMTP_PASS  (and optionally SMTP_HOST, SMTP_PORT)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Optional: verify SMTP configuration on startup
transporter.verify(err => {
  if (err) console.error('SMTP setup error:', err);
  else     console.log('SMTP server is ready to send mail');
});

// 5) New POST /contact endpoint
//    body: { to: string, number: string }
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

// 6) Fallback—serve index.html for all other GETs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 7) Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
