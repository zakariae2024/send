const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 25,
  secure: false,
  tls: { rejectUnauthorized: false }
});

app.post('/send-bulk', async (req, res) => {
  const { recipients, subject, html } = req.body;

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ error: 'خاصك تعطي على الأقل إيميل واحد' });
  }

  const results = [];
  for (const email of recipients) {
    try {
      await transporter.sendMail({
        from: '"مرسل تجريبي" <test@localhost>',
        to: email,
        subject: subject,
        html: html
      });
      results.push({ email, status: 'success' });
    } catch (err) {
      results.push({ email, status: 'failed', error: err.message });
    }
  }
  res.json({ results });
});

app.listen(3000, () => {
  console.log('الخادم الخلفي خدام على http://localhost:3000');
});
