require("dotenv").config();
const { Client } = require('@twilio/conversations');
const AccessTokenGenerator = require("../scripts/AccessTokenGenerator");
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNo = process.env.SENDER_NUMBER;
let initialised = false;
let client;

async function initialiseClient() {
  const token = AccessTokenGenerator.generate();
  console.debug("Token to use in client creation",token);
  client = await Client.create(token);
  console.log("CLIENT INITIALISED!");

  client.on('stateChanged', (state) => {
    console.debug("Twilio Conversations client state changed:", state);
    if (state === 'initialized') {
      initialised = true;
    }
  });
}

async function testWaitForInitialisation() {
  do {
    console.log("Initialised:", initialised);
    sleep(1000);
  } while(!initialised);

  console.log("Final... Initialised:", initialised);
}

 function sleep(milliseconds) {
      let timeStart = new Date().getTime();
      while (true) {
          let elapsedTime = new Date().getTime() - timeStart;
          if (elapsedTime > milliseconds) {
              break;
          }
      }
  }


async function loadMessages(conversationSid, msgLimit = 30) {
  await waitForInitialisation();
  const conv = await client.getConversationBySid(conversationSid);
  console.log("Printing all messages in the conversation...");
  const messages = await conv.getMessages(msgLimit);
  messages.items.forEach(msg => console.log(msg));
  //TODO Handle pagination
}

async function waitForInitialisation() {
  if(!initialised) {
    const MAX = 15000;
    let timeout = 5000;
    do {
      setTimeout(() => console.log("Sleeping for", timeout, "ms"), timeout);
      timeout += 5000;
    } while (timeout <= MAX);

    if(!initialised) {
      const msg = "Conversations client not initialised before timeout";
      console.error(msg);
      throw msg;
    }
  } else {
    console.log("Conversations client is initialised");
  }
}

async function sendMessage(recipient, message, conversationSid) {
  await waitForInitialisation();
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
  await waitForInitialisation();
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

async function validateParticipant(conv, recipient) {
  await waitForInitialisation();
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
  sendMessage,
  testWaitForInitialisation
}

initialiseClient();

module.exports.loadMessages = SMSHandlerModule.loadMessages;
module.exports.sendMessage = SMSHandlerModule.sendMessage;
module.exports.testWaitForInitialisation = SMSHandlerModule.testWaitForInitialisation;
module.exports = SMSHandlerModule;

