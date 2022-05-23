require("dotenv").config();
const acctSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNo = process.env.SENDER_NUMBER;
const client = require('twilio')(acctSid, authToken);

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
    .list();
  for(let i=0; i<allConversations.length; i++) {
    const c = allConversations[i];
    const convParticipants = await getChatParticipants(c.sid);
    const convContainsParticipant = convParticipants.find(participant => participant.sid === participantSid);
    if(convContainsParticipant) {
      return c.sid;
    }
  }

  // TODO: If we don't have a ConversationSID for this participant, create one and add them as a ConversationParticipant
}

/**
 * Creates a new conversation for the provided phone number, and adds the number as a Conversation Participant.
 * Returns the ConversationParticipantSID to be used in future calls.
 */
async function createConversationForUser(userPhoneNumber) {
  const conversation = await client.conversations.conversations
    .create({
       friendlyName: 'Mood Conversation'
     });

  const participant = await client.conversations.conversations(conversation.sid)
    .participants
    .create({
       'messagingBinding.address': userPhoneNumber,
       'messagingBinding.proxyAddress': senderNo
     });

// ConversationParticipant UUID (UserSID)
   return participant.sid;
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

async function deleteAllConversations() {
  const conversations = await client.conversations.conversations.list();
  for(let i=0; i<conversations.length; i++) {
    const convSid = conversations[i].sid;
    console.debug("Deleting conversation", convSid);
    await client.conversations.conversations(convSid).remove();
  }
}

async function deleteMessagesInConversation(convSid) {
  const messages = await listConversationMessages(convSid);
  for(let i=0; i<messages.length; i++) {
    await client.conversations.conversations(convSid)
      .messages(messages[i].sid)
      .remove();
  }
}

const SMSHandlerModule = {
  loadMessages,
  listConversationMessages,
  sendMessage,
  getConversationSID,
  deleteAllConversations,
  deleteMessagesInConversation,
  createConversationForUser
}

module.exports.loadMessages = SMSHandlerModule.loadMessages;
module.exports.listConversationMessages = SMSHandlerModule.listConversationMessages;
module.exports.sendMessage = SMSHandlerModule.sendMessage;
module.exports.getConversationSID = SMSHandlerModule.getConversationSID;
module.exports.deleteAllConversations = SMSHandlerModule.deleteAllConversations;
module.exports.deleteMessagesInConversation = SMSHandlerModule.deleteMessagesInConversation;
module.exports.createConversationForUser = SMSHandlerModule.createConversationForUser;
module.exports = SMSHandlerModule;

