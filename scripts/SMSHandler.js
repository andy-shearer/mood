require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifiedRcp = process.env.VERIFIED_RECIPIENT_NUMBER;
const senderNo = process.env.SENDER_NUMBER;
const convSid = process.env.CREATED_CONVERSATION_SID;   // CREATED_CONVERSATION_SID is the conversation I've already created between these two numbers
const client = require('twilio')(accountSid, authToken);

loadMessagesFor = async (conversationSid, msgLimit = 20) => {
  console.log(`Fetching up to ${msgLimit} messages for conversation`, conversationSid);
  await client.conversations.conversations(conversationSid)
        .messages
        .list({msgLimit})
        .then(messages => messages.forEach(m => console.log("Message SID:", m.sid, "Message Body:", m.body)));
};

sendMessage = async (conversationSid, message) => {
  await client.conversations.conversations(conversationSid)
        .messages
        .create({author: 'moodBot', body: message})
        .then(message => console.debug("Sent a new message with SID", message.sid));
};

async function main() {
//  const conversation = await client.conversations.conversations
//    .create({friendlyName: 'AndyS New Conversation #1'});

//  console.log(conversation);
//  const convSid = conversation.sid;
//  await client.conversations.conversations(convSid)
//    .participants
//    .create({
//       'messagingBinding.address': verifiedRcp,
//       'messagingBinding.proxyAddress': senderNo
//     })
//    .then(participant => console.log(participant.sid));
  const timeString = new Date().toLocaleTimeString("en-GB");
  await sendMessage(convSid, `Hey this message is going out to you at ${timeString}`);
  await loadMessagesFor(convSid);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
