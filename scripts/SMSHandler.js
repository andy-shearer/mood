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
      console.debug("Conversation", c.sid, "contains participant", participantSid);
      return c.sid;
    }
  }
}

async function loadMessages(conversationSid) {
  const conv = await client.getConversationBySid(conversationSid);
  console.log("Printing all messages in the conversation...");
  const messages = await conv.getMessages();
  messages.items.forEach(msg => console.log(msg));
  //TODO Handle pagination
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

async function getConversation(recipient, convSid) {
  if (convSid) {
    const conv = await client.getConversationBySid(convSid);
    return conv;
  } else {
    const name = `conv_${new Date().getTime()}`;
    const conversation = await client.createConversation({
      uniqueName: name,
      friendlyName: name,
      attributes: {
        user: recipient
      }
    });
    return conversation;
  }
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
  getChatParticipants,
  getConversationSID
}

module.exports.loadMessages = SMSHandlerModule.loadMessages;
module.exports.sendMessage = SMSHandlerModule.sendMessage;
module.exports.getChatParticipants = SMSHandlerModule.getChatParticipants;
module.exports.getConversationSID = SMSHandlerModule.getConversationSID;
module.exports = SMSHandlerModule;

