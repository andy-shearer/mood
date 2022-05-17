require("dotenv").config();
const acctSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(acctSid, authToken);
const senderNo = process.env.SENDER_NUMBER;

/**
 * Performs a lookup of the ConversationParticipant resources that are associated with
 * the provided Conversation SID.
 *
 * Returns an array of ConversationParticipant resources. See API docs for the resource:
 * https://www.twilio.com/docs/conversations/api/conversation-participant-resource
 */
async function getChatParticipants(conversationSid) {
  //console.debug("Listing conversation participants for conv", conversationSid);
  const convParts = await client.conversations.conversations(conversationSid)
    .participants
    .list();
  //console.debug(convParts);
  return convParts;
}

async function getConversationSID(participantSid) {
  const allConversations = await client.conversations.conversations
    .list()
  for(let i=0; i<allConversations.length; i++) {
    const c = allConversations[i];
    const convParticipants = await getChatParticipants(c.sid);
    const convContainsParticipant = convParticipants.find(participant => participant.sid === participantSid);
    if(convContainsParticipant) {
      /**
       * TODO: Will the participant ever be listed in more than one conversation?
       * TODO: If so, we could decide which conversation to use by collecting all matched conversations and
       * TODO: filtering by 'last_read_timestamp' or 'last_read_message_index'
       */
      //console.debug("Conversation", c.sid, "contains participant", participantSid);
      return c.sid;
    }
  }
}

/**
 * Retrieves all ConversationMessage instances from a Conversation Instance
 *
 * See API docs for details:
 * https://www.twilio.com/docs/conversations/api/conversation-message-resource#conversationmessage-properties
 */
async function listConversationMessages(conversationSid) {
  const messages = await client.conversations.conversations(conversationSid)
    .messages
    .list();
  //console.debug(messages);
  return messages;
}

async function loadMessages(conversationSid) {
  const messages = await listConversationMessages(conversationSid);
  return messages.map(msg => msg.body);
}

async function sendMessage(participantSid, message) {
  const cSid = await getConversationSID(participantSid);
  await _sendMessage(cSid, message);
}

async function _sendMessage(conversationSid, mBody) {
  const message = await client.conversations.conversations(conversationSid)
    .messages
    .create({author: 'moodBot', body: mBody});
  console.debug("Sent a new message with msgSid", message.sid);
}

async function validateParticipant(conv, recipient) {

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
  getConversationSID
}

module.exports.loadMessages = SMSHandlerModule.loadMessages;
module.exports.sendMessage = SMSHandlerModule.sendMessage;
module.exports.getConversationSID = SMSHandlerModule.getConversationSID;
module.exports = SMSHandlerModule;

