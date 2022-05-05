require("dotenv").config();
const { Client } = require('@twilio/conversations');
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNo = process.env.SENDER_NUMBER;

async function loadMessages(conversationSid, msgLimit = 30) {
  const client = new Client(authToken);
  client.on('stateChanged', (state) => async {
    if (state === 'initialized') {
      const conv = await client.getConversationBySid(conversationSid);
      console.log("Printing all messages in the conversation...");
      const messages = await conv.getMessages(msgLimit);
      messages.items.forEach(msg => console.log(msg));
      //TODO Handle pagination
    }
  }
}

async function sendMessage(recipient, message, conversationSid) {
  const conversation = await getConversation(recipient, conversationSid);
  await validateParticipant(conversation, recipient);
  const msgSid = await conversation.sendMessage(
    message,
    {
      author: 'moodHQ'
    }
  );

  console.debug("Sent a new message with index", msgSid);
}

async function getConversation(recipient, convSid) {
  const client = new Client(token);
  client.on('stateChanged', (state) => {
    if (state === 'initialized') {
        if (convSid) {
          const conv = await client.getConversationBySid(convSid);
          return conv;
        } else {
          const conversation = await client.createConversation({
              uniqueName: `conv_${new Date().getTime()}`,
              friendlyName: `Conversation with ${recipient}`,
              attributes: {
                user: recipient
              }
            });
          return conversation;
        }
    }
  }
}

async function validateParticipant(conv, recipient) {
  const participants = await conv.getParticipants();

  for(let i=0; i<participants.length; i++) {
    console.debug("Conversation participant", i, participants[i]);
    if(participants[i].attributes.user === recipient) {
      return;
    }
  }

  // Add the participant to the conversation
  const response = await conv.addNonChatParticipant(
    senderNo,
    recipient,
    {
      user: recipient
    }
  );

  console.log("ParticipantResponse for newly created conversation participant", response);
}

const SMSHandlerModule = {
  loadMessages,
  sendMessage
}

module.exports.loadMessages = SMSHandlerModule.loadMessages;
module.exports.sendMessage = SMSHandlerModule.sendMessage;
module.exports = SMSHandlerModule;
