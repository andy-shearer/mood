const SMSHandler = require("../scripts/SMSHandler");
const Daily = require("../scripts/Daily");
require("dotenv").config();

const participantSid = process.env.EXAMPLE_CONVERSATION_PARTICIPANT_SID;
const recipientNo = process.env.VERIFIED_RECIPIENT_NUMBER;

function getMsg() {
  if(new Date().getHours() < 12) {
    return Daily.getMorningMsg();
  } else {
    return Daily.getAfternoonMsg();
  }
}

/**
 * Helper class to call the SMSHelper functions
 */
async function main() {
//  await SMSHandler.sendMessage(
//    participantSid,
//    getMsg()
//  );

  const conversationSid = await SMSHandler.getConversationSID(participantSid);
  const messages = await SMSHandler.listConversationMessages(conversationSid);
  console.log(messages);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });