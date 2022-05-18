
export default function handler(req, res) {
  // TODO: Authenticate 'X-Twilio-Signature' header
  res.status(200).json({
    message: 'Hi 👋'
  });

  console.log("\n====================================\n", new Date().toLocaleTimeString("en-GB"));
  if(req.body.EventType === "onMessageAdded") {
    console.log("RECEIVED INBOUND MESSAGE from", req.body.Author);
    console.log(req.body);
  }

  //console.debug(req);
  console.log("\n====================================\n");
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
