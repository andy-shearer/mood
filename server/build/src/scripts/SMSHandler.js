"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderNo = process.env.SENDER_NUMBER;
const acctSid = process.env.TWILIO_ACCOUNT_SID;
const client = require('twilio')(acctSid, authToken);
const phoneUtil = require('google-libphonenumber').phoneUtil;
const PNF = require('google-libphonenumber').PhoneNumberFormat;
/**
 * Performs a lookup of the ConversationParticipant resources that are associated with
 * the provided Conversation SID.
 *
 * Returns an array of ConversationParticipant resources. See API docs for the resource:
 * https://www.twilio.com/docs/conversations/api/conversation-participant-resource
 */
function getChatParticipants(conversationSid) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.debug("Listing conversation participants for conv", conversationSid);
        const convParts = yield client.conversations.conversations(conversationSid)
            .participants
            .list();
        //console.debug(convParts);
        return convParts;
    });
}
function getConversationSID(participantSid) {
    return __awaiter(this, void 0, void 0, function* () {
        const allConversations = yield client.conversations.conversations
            .list();
        for (let i = 0; i < allConversations.length; i++) {
            const c = allConversations[i];
            const convParticipants = yield getChatParticipants(c.sid);
            const convContainsParticipant = convParticipants.find(participant => participant.sid === participantSid);
            if (convContainsParticipant) {
                return c.sid;
            }
        }
    });
}
/**
 * Creates a new conversation for the provided phone number, and adds the number as a Conversation Participant.
 * Returns the ConversationParticipantSID to be used in future calls.
 */
function createConversationForUser(userPhoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const tel = phoneUtil.parse(userPhoneNumber);
        const targetNumber = phoneUtil.format(tel, PNF.E164); // Normalise the format of the number to include the country code
        // Return the conversation for this phone number if it already exists
        const existing = yield getConversationParticipantSid(targetNumber);
        if (existing) {
            return existing;
        }
        const conversation = yield client.conversations.conversations
            .create({
            friendlyName: 'Mood Conversation'
        });
        const participant = yield client.conversations.conversations(conversation.sid)
            .participants
            .create({
            'messagingBinding.address': targetNumber,
            'messagingBinding.proxyAddress': senderNo
        });
        // ConversationParticipant UUID (UserSID)
        return participant.sid;
    });
}
function getConversationParticipantSid(userPhoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const allConversations = yield client.conversations.conversations
            .list();
        for (let i = 0; i < allConversations.length; i++) {
            const c = allConversations[i];
            const convParticipants = yield getChatParticipants(c.sid);
            const targetParticipant = convParticipants.find(participant => {
                return (participant.messagingBinding && participant.messagingBinding.address === userPhoneNumber);
            });
            if (targetParticipant) {
                return targetParticipant.sid;
            }
        }
    });
}
/**
 * Retrieves all ConversationMessage instances from a Conversation Instance
 *
 * See API docs for details:
 * https://www.twilio.com/docs/conversations/api/conversation-message-resource#conversationmessage-properties
 */
function listConversationMessages(conversationSid) {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = yield client.conversations.conversations(conversationSid)
            .messages
            .list();
        //console.debug(messages);
        return messages;
    });
}
function loadMessages(conversationSid) {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = yield listConversationMessages(conversationSid);
        return messages.map(msg => msg.body);
    });
}
function sendMessage(participantSid, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const cSid = yield getConversationSID(participantSid);
        yield _sendMessage(cSid, message);
    });
}
function _sendMessage(conversationSid, mBody) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = yield client.conversations.conversations(conversationSid)
            .messages
            .create({ author: 'moodBot', body: mBody });
        console.debug("Sent a new message with msgSid", message.sid);
    });
}
function deleteAllConversations() {
    return __awaiter(this, void 0, void 0, function* () {
        const conversations = yield client.conversations.conversations.list();
        for (let i = 0; i < conversations.length; i++) {
            const convSid = conversations[i].sid;
            console.debug("Deleting conversation", convSid);
            yield client.conversations.conversations(convSid).remove();
        }
    });
}
function deleteMessagesInConversation(convSid) {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = yield listConversationMessages(convSid);
        for (let i = 0; i < messages.length; i++) {
            yield client.conversations.conversations(convSid)
                .messages(messages[i].sid)
                .remove();
        }
    });
}
const SMSHandlerModule = {
    loadMessages,
    listConversationMessages,
    sendMessage,
    getConversationSID,
    deleteAllConversations,
    deleteMessagesInConversation,
    createConversationForUser
};
module.exports.loadMessages = SMSHandlerModule.loadMessages;
module.exports.listConversationMessages = SMSHandlerModule.listConversationMessages;
module.exports.sendMessage = SMSHandlerModule.sendMessage;
module.exports.getConversationSID = SMSHandlerModule.getConversationSID;
module.exports.deleteAllConversations = SMSHandlerModule.deleteAllConversations;
module.exports.deleteMessagesInConversation = SMSHandlerModule.deleteMessagesInConversation;
module.exports.createConversationForUser = SMSHandlerModule.createConversationForUser;
module.exports = SMSHandlerModule;
