let apiai = require("apiai");
const chalk = require('chalk');
const Telegram = require('node-telegram-bot-api');

const options = {
    sessionId: 'secretkey'
};

const token = '640943083:AAEGjHB30rCe5VyByMgEbL66uzoEKuQ-TXI';
const app = apiai("bf02796e8eda40d3aded310252fba744");
const marbod_bot = new Telegram(token, { polling: true });

marbod_bot.on('message', function(msg) {
    var chatId = msg.chat.id;
    var message = msg.text.toString()

	ask(message, {sessionId: 'secretkey'}, chatId);
})


function ask(text, options, chatId) {
	let apiaiRequest = app.textRequest(text, options);
	apiaiRequest.on('response', (response) => { marbod_bot.sendMessage(chatId, response.result.fulfillment.speech) })
	apiaiRequest.on('error', (error) => { marbod_bot.sendMessage(chatId, 'Bot not connected :(') });
	apiaiRequest.end();
}