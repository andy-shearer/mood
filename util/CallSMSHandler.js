const SMSHandler = require("../scripts/SMSHandler");
require("dotenv").config();

const verifiedRcp = process.env.VERIFIED_RECIPIENT_NUMBER;
const senderNo = process.env.SENDER_NUMBER;
const convSid = process.env.CREATED_CONVERSATION_SID;   // CREATED_CONVERSATION_SID is the conversation I've already created between the two numbers

/**
 * Helper class to call the SMSHelper functions
 */
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
  await SMSHandler.sendMessage(convSid, `Hey this message is going out to you at ${timeString}`);
  await SMSHandler.loadMessagesFor(convSid);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });