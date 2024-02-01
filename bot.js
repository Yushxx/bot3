const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// Replace 'YOUR_BOT_TOKEN' with your own Telegram bot token
const bot = new TelegramBot('6553658011:AAFthGIY9Zs7-JW8pdZH3V_V-uw5_7mMkvM', { polling: true });

// Function to generate a random sequence
function generate_sequence() {
    const sequence = ["🟩", "🟩", "🟩", "🟩", "🍎"];
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

🚨 FONCTIONNE UNIQUEMENT SUR 1XBET ET LINEBET AVEC LE CODE PROMO Free221 ✅️ !`;
    
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
    const welcomeText = "Bonjour! Veuillez regarder la vidéo ci-dessous pour plus d'instructions:";
    const video = 'https://t.me/gsgzheh/3';

    bot.sendMessage(chatId, welcomeText)
        .then(() => {
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

    if (userId >= 670000000 && userId <= 790000000) {
        sendSequenceToChannel(chatId);
    } else if (userId >= 100000000 && userId <= 699999999) {
        bot.sendMessage(chatId, 'ID refusé ❌. Veuillez créer un nouveau compte avec le code promo Free221 et réessayez.');
    } else {
        bot.sendMessage(chatId, 'Votre ID n\'est pas valide. Créez un nouveau compte avec le code promo Free221 et réessayez.');
    }
});

// HTTP server for keep-alive
http.createServer(function (req, res) {
    res.write("I'm alive");
    res.end();
}).listen(8080);
