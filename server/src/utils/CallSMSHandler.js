/**
 * Helper class to send SMS, trigger monthly analysis functions etc
 */

const SMSHandler = require("../scripts/SMSHandler");
const Daily = require("../scripts/Daily");
const MonthlyAnalysis = require("../scripts/MonthlyAnalysis");
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

async function main() {
//  await SMSHandler.sendMessage(
//    participantSid,
//    getMsg()
//  );

  const newSid = await SMSHandler.createConversationForUser("07432561676");
  console.log("Existing SID", participantSid);
  console.log("New SID", newSid);

  //const conversationSid = await SMSHandler.getConversationSID(participantSid);
//  const messages = await SMSHandler.loadMessages(conversationSid);
//  console.log(messages);
//  await SMSHandler.deleteMessagesInConversation(conversationSid);
  const analysis = await MonthlyAnalysis.conversationAnalysis(participantSid);
  console.log(analysis);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });