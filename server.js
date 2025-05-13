const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/api/lead', async (req, res) => {
  const { name, phone, center } = req.body;

  // Отправка на Zapier Webhook
  const zapierResponse = await fetch('https://hooks.zapier.com/hooks/catch/ВАШ_WEBHOOK_ID/ВАШ_WEBHOOK_KEY/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, center })
  });

  const zapierData = await zapierResponse.text();
  res.status(200).send({ status: 'ok', zapier: zapierData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on port', PORT));
