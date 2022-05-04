require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function loadMessagesFor(conversationSid, msgLimit = 20) {
  console.log(`Fetching up to ${msgLimit} messages for conversation`, conversationSid);
  await client.conversations.conversations(conversationSid)
        .messages
        .list({msgLimit})
        .then(messages => messages.forEach(m => console.log("Message SID:", m.sid, "Message Body:", m.body)));
}

async function sendMessage(conversationSid, message) {
  await client.conversations.conversations(conversationSid)
        .messages
        .create({author: 'moodBot', body: message})
        .then(message => console.debug("Sent a new message with SID", message.sid));
}

const SMSHandlerModule = {
  loadMessagesFor,
  sendMessage
}

module.exports.loadMessagesFor = SMSHandlerModule.loadMessagesFor
module.exports.sendMessage = SMSHandlerModule.sendMessage
module.exports = SMSHandlerModule
