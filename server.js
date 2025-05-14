const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/lead', async (req, res) => {
  console.log('Получено с сайта:', req.body);
  const { name, phone, center } = req.body;

  // Отправка на Zapier Webhook
  const zapierResponse = await fetch('https://hooks.zapier.com/hooks/catch/22921441/273qvb2/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, center })
  });

  const zapierData = await zapierResponse.text();
  console.log('Отправляем в Zapier:', { name, phone, center });
  res.status(200).send({ status: 'ok', zapier: zapierData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on port', PORT));
