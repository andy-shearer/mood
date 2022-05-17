const SMSHandler = require("../scripts/SMSHandler");
require("dotenv").config();

const convSid = process.env.CREATED_CONVERSATION_SID;
const verifiedRcp = process.env.VERIFIED_RECIPIENT_NUMBER;
const participantSid = process.env.EXAMPLE_CONVERSATION_PARTICIPANT_SID;

/**
 * Helper class to call the SMSHelper functions
 */
async function main() {
  // await SMSHandler.getChatParticipants(convSid); // Print all participants in our created Conversation instance
  const cSid = await SMSHandler.getConversationSID(participantSid); // ParticipantSid will be stored in the database for every user
  //const timeString = new Date().toLocaleTimeString("en-GB");
  //await SMSHandler.sendMessage(verifiedRcp, `Hey this message is going out to you at ${timeString}`, convSid);
  //await SMSHandler.loadMessages(convSid);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });