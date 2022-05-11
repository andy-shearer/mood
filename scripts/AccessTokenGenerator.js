const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const defaultChatServiceSid = process.env.TWILIO_DEFAULT_CHAT_SERVICE_SID;
const twilioApiKey = process.env.TWILIO_MOOD_API_KEY;
const twilioApiSecret = process.env.TWILIO_MOOD_API_SECRET;

function generate() {
  const AccessToken = require('twilio').jwt.AccessToken;
  const ChatGrant = AccessToken.ChatGrant;

  // Used specifically for creating Chat tokens
  const identity = 'MoodBot';

  // Create a "grant" which enables a client to use Chat as a given user,
  // on a given device
  const chatGrant = new ChatGrant({
    serviceSid: defaultChatServiceSid,
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {identity: identity}
  );

  token.addGrant(chatGrant);

  // Serialize the token to a JWT string
  return token.toJwt();
}

const SMSHandlerModule = {
  generate
}

module.exports.generate = SMSHandlerModule.generate;
module.exports = SMSHandlerModule;