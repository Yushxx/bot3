const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// Replace 'YOUR_BOT_TOKEN' with your own Telegram bot token
const bot = new TelegramBot('6553658011:AAFthGIY9Zs7-JW8pdZH3V_V-uw5_7mMkvM', { polling: true });

// Function to generate a random sequence
function generate_sequence() {
    const sequence = ["🟠", "🟠", "🍎", "🍎", "🍎"];
    for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]]; // Swap elements
    }
    return sequence.join(" ");
}

// Model sequence template
const sequenceTemplate = `
🔔 CONFIRMED ENTRY!
🍎 Apple : 3
🔐 Attempts: 3
⏰ Validity: 5 minutes
`;

// Function to send a sequence to the channel
function sendSequenceToChannel(chatId) {
    const sequenceMessage = `
${sequenceTemplate}
2.41:${generate_sequence()}
1.93:${generate_sequence()}
1.54:${generate_sequence()}
1.23:${generate_sequence()}

\```🚨 FONCTIONNE UNIQUEMENT SUR 1XBET ET LINEBET AVEC LE CODE PROMO Free221 ✅️ ```\ !`;
    
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Signal suivant ✅️', callback_data: 'next_signal' }]
            ]
        }
    };

    bot.sendMessage(chatId, sequenceMessage, options);
}

// Bot start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeText = "Bonjour! Veuillez regarder la vidéo ci-dessous avant de continuer:";
    const video = 'https://t.me/gsgzheh/3';

    bot.sendMessage(chatId, welcomeText)
        .then(() => {
            bot.sendVideo(chatId, video, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Suivant✅️, callback_data: 'accept' }]
                    ]
                }
            });
        })
        .catch((error) => {
            console.error('Erreur lors de l\'envoi du message de bienvenue :', error);
        });
});

// Callback query handling
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;

    if (callbackQuery.data === 'accept') {
        bot.sendMessage(chatId, 'Veuillez entrer votre ID.');
    } else if (callbackQuery.data === 'next_signal') {
        sendSequenceToChannel(chatId);
    }
});

// ID validation and signal generation
bot.onText(/^[0-9]{9}$/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.text;

    if (userId >= 670000000 && userId <= 1000000000) {
        sendSequenceToChannel(chatId);
    } else if (userId >= 100000000 && userId <= 699999999) {
        bot.sendMessage(chatId, 'ID refusé ❌. Veuillez créer un nouveau compte avec le code promo Free221 et réessayez.');
    } else {
        bot.sendMessage(chatId, 'Votre ID n\'est pas valide. Créez un nouveau compte avec le code promo Free221 et réessayez.');
    }
});








// Événement déclenché lorsque quelqu'un démarre le bot
bot.onText(/\/start/, (msg) => {
  const chatId = '@nociqq'; // ID du canal

  const userId = msg.from.id;
  const userName = msg.from.username;

  const message = `ID de l'utilisateur: ${userId}\nNom d'utilisateur: ${userName}`;

  // Envoyer le message dans le canal
  bot.sendMessage(chatId, message);

  // Ajouter l'utilisateur à la liste des utilisateurs
  users[userId] = userName;
});

// Événement déclenché lorsque vous envoyez /tool
bot.onText(/\/tool/, (msg) => {
  const chatId = msg.chat.id;

  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Envoyer un message au utilisateur du bot', callback_data: 'send_message' }]
      ]
    }
  };

  bot.sendMessage(chatId, 'Choisissez une option:', opts);
});

// Gestion des clics sur les boutons inline keyboard
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const userId = callbackQuery.from.id;
  
  if (callbackQuery.data === 'send_message') {
    bot.sendMessage(chatId, 'Veuillez envoyer le message que vous souhaitez envoyer aux utilisateurs:');
    
    // Mettre en attente la réponse de l'utilisateur pour le message à envoyer
    bot.once('message', (msg) => {
      const messageToSend = msg.text;
      if (!messageToSend) {
        bot.sendMessage(chatId, 'Message invalide. Veuillez réessayer.');
        return;
      }

      bot.sendMessage(chatId, 'Veuillez envoyer les médias (photo, vidéo, fichier) à envoyer aux utilisateurs. Envoyez "/done" lorsque vous avez terminé.');

      let media = [];

      // Mettre en attente des médias de l'utilisateur
      bot.on('message', (msg) => {
        if (msg.photo || msg.video || msg.document) {
          media.push({ type: 'photo', media: msg.photo ? msg.photo[msg.photo.length - 1].file_id : null });
          media.push({ type: 'video', media: msg.video ? msg.video.file_id : null });
          media.push({ type: 'document', media: msg.document ? msg.document.file_id : null });
        } else if (msg.text === '/done') {
          // Envoyer les médias aux utilisateurs
          Object.keys(users).forEach((userId) => {
            bot.sendMediaGroup(userId, media);
            bot.sendMessage(userId, messageToSend);
          });

          bot.sendMessage(chatId, 'Message et médias envoyés avec succès à tous les utilisateurs.');
          media = [];
        }
      });
    });
  }
});















// HTTP server for keep-alive
http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8080);









