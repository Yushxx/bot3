const TelegramBot = require('node-telegram-bot-api');
const http = require('http'); // Ajoutez le module 'http'

// Remplacez 'YOUR_BOT_TOKEN' par votre propre jeton de bot Telegram
const bot = new TelegramBot('6553658011:AAFthGIY9Zs7-JW8pdZH3V_V-uw5_7mMkvM', { polling: true });

function generateRandomSignal() {
  const appleCount = Math.floor(Math.random() * 6); // Entre 0 et 5 pommes
  const attempts = Math.floor(Math.random() * 6); // Entre 0 et 5 tentatives
  const validityMinutes = 5; // La validité est fixée à 5 minutes

  const sequence = [];
  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      row.push(Math.random() < 0.5 ? '🟩' : '🟩'); // 50% de chance pour 🟩 et 🟨
    }
    const randomIndex = Math.floor(Math.random() * 5);
    row[randomIndex] = '🍎'; // Placez une pomme aléatoirement
    const time = (Math.random() * 3 + 1).toFixed(2); // Temps aléatoire entre 1.00 et 3.00
    sequence.push(`${time}:${row.join(' ')}`);
  }

  const signal = `🔔 CONFIRMED ENTRY!\n🍎 Apple : ${appleCount}\n🔐 Attempts: ${attempts}\n⏰ Validity: ${validityMinutes} minutes\n\n${sequence.join('\n')}\n🚨 FONCTIONNE UNIQUEMENT SUR 1XBET ET LINEBET AVEC LE CODE PROMO Free221 ✅️ !`;

  return signal;
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeText = "Bonjour! Veuillez regarder la vidéo ci-dessous pour plus d'instructions:";
  const video = 'https://t.me/gsgzheh/3';

  bot.sendMessage(chatId, welcomeText)
    .then(() => {
      // Une fois que le message de bienvenue est envoyé, envoyez la vidéo
      bot.sendVideo(chatId, video, {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'J\'ai rempli tous les conditions', callback_data: 'accept' }]
          ]
        }
      });
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi du message de bienvenue :', error);
    });
});

bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;

  if (callbackQuery.data === 'accept') {
    bot.sendMessage(chatId, 'Veuillez entrer votre ID.');
  }
});



bot.onText(/^[0-9]{9}$/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.text;

  if (userId >= 670000000 && userId <= 790000000) {
    const randomSignal = generateRandomSignal();
    bot.sendMessage(chatId, randomSignal, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Signal suivant ✅️', callback_data: 'next_signal' }]
        ]
      }
    });
  } else if (userId >= 100000000 && userId <= 699999999) {
    bot.sendMessage(chatId, 'ID refusé ❌. Veuillez créer un nouveau compte avec le code promo Free221 et réessayez.');
  } else {
    bot.sendMessage(chatId, 'Votre ID n\'est pas valide. créer un nouveau compte avec le code promo Free221 et réessayez.');
  }
});







bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;

  if (callbackQuery.data === 'next_signal') {
    const nextSignal = generateRandomSignal();
    bot.sendMessage(chatId, nextSignal, {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Signal suivant ✅️', callback_data: 'next_signal' }]
        ]
      }
    });
  }
});

// Créez un serveur HTTP pour le maintien en vie (keep-alive)
http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8080);
