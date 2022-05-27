import { Request, Response } from "express";
import log from "../utils/logger";

export async function webhookHandler(req: Request, res: Response) {
  // TODO: Authenticate 'X-Twilio-Signature' header
  // TODO: Handle Opt-Outs https://www.twilio.com/docs/messaging/services/tutorials/advanced-opt-out#keeping-track-of-your-users-status
  const query = req.query;
  if (query.EventType === "onMessageAdded") {
    log.info("RECEIVED INBOUND MESSAGE from " + query.Author);
    log.info("Message body: " + query.Body);
    log.debug(query);
  } else if (query.EventType) {
    log.info("Event received " + query.EventType);
  }
  //log.debug(req);

  res.status(200).json({
    message: "Hi 👋",
  });
}

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
