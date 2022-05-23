const SMSHandler = require("../scripts/SMSHandler");
const Daily = require("../scripts/Daily");
require("dotenv").config();

const participantSid = process.env.EXAMPLE_CONVERSATION_PARTICIPANT_SID;
const recipientNo = process.env.VERIFIED_RECIPIENT_NUMBER;

/**
 * Helper class to call the SMSHelper functions
 */
async function main() {
  const timeString = new Date().toLocaleTimeString("en-GB");
  await SMSHandler.sendMessage(
    participantSid,
    Daily.getMessage()
  );

//  const conversationSid = await SMSHandler.getConversationSID(participantSid);
//  const messages = await SMSHandler.loadMessages(conversationSid);
//  console.log(messages);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });