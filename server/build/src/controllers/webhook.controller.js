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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
function webhookHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Authenticate 'X-Twilio-Signature' header
        const query = req.query;
        if (query.EventType === "onMessageAdded") {
            logger_1.default.info("RECEIVED INBOUND MESSAGE from " + query.Author);
            logger_1.default.info("Message body: " + query.Body);
            logger_1.default.debug(query);
        }
        else if (query.EventType) {
            logger_1.default.info("Event received " + query.EventType);
        }
        //log.debug(req);
        res.status(200).json({
            message: "Hi 👋",
        });
    });
}
exports.webhookHandler = webhookHandler;
// EXAMPLE 'onMessageAdded' event HTTP POST body:
//
//{
//  MessagingServiceSid: 'MGXXX...',
//  EventType: 'onMessageAdded',
//  Attributes: '{}',
//  DateCreated: '2022-05-18T13:42:17.312Z',
//  Index: '4',
//  MessageSid: 'IMXXX...',
//  AccountSid: 'ACXXX...',
//  Source: 'SMS',
//  RetryCount: '0',
//  Author: '+447...',
//  ParticipantSid: 'MBXXX...',
//  Body: 'This is the actual message content',
//  ConversationSid: 'CHXXX...'
//}
