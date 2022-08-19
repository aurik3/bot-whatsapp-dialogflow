const qrcode = require('qrcode-terminal');
const { Client,LocalAuth } = require('whatsapp-web.js');
const dialogflow = require("./components/dialogflow");
const chat = require("./modules/chat");
const uuid = require("uuid");

const sessionIds = new Map();

global.client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }


});
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    setSessionAndUser(message.from);
    let session = sessionIds.get(message.from); 
    let payload = await dialogflow.sendToDialogFlow(message.body, session);
    //console.log(payload);
    let responses = payload.fulfillmentMessages;
    //console.log(responses);
    for (const response of responses) {
        await chat.bot(client, message, response);
        //await sendMessageToWhatsapp(client, message, response);
     }
});
 
client.initialize();


async function setSessionAndUser(senderId) {
    try {
      if (!sessionIds.has(senderId)) {
        sessionIds.set(senderId, uuid.v1());
      }
    } catch (error) {
      throw error;
    }
  }