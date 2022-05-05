const SMSHandler = require("../scripts/SMSHandler");
require("dotenv").config();

const convSid = process.env.CREATED_CONVERSATION_SID;
const verifiedRcp = process.env.VERIFIED_RECIPIENT_NUMBER;

/**
 * Helper class to call the SMSHelper functions
 */
async function main() {
  const timeString = new Date().toLocaleTimeString("en-GB");
  await SMSHandler.sendMessage(verifiedRcp, `Hey this message is going out to you at ${timeString}`, convSid);
  await SMSHandler.loadMessages(convSid);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });