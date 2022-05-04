require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

async function main() {
  console.log(accountSid, authToken);
  const client = require('twilio')(accountSid, authToken);
  client.conversations.conversations
        .create({friendlyName: 'AndyS First Conversation'})
        .then(conversation => console.log(conversation.sid));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
