const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Endpoint to start the bot
app.post('/api/start-bot', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send({ message: 'Bot token is required.' });
  }

  try {
    const bot = new TelegramBot(token, { polling: true });

    // Listen to messages and auto-respond
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const userMessage = msg.text.toLowerCase();

      if (userMessage === 'join') {
        bot.sendMessage(chatId, 'I am joining the chat!');
      } else if (userMessage === 'accept request') {
        bot.sendMessage(chatId, 'Request accepted!');
      }
    });

    res.send({ message: 'Bot started successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Error starting bot', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
