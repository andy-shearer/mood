const SMSHandler = require("./SMSHandler");
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function conversationAnalysis(participantSID) {
  const convSID = SMSHandler.getConversationSID(participantSID);
  let messages = await SMSHandler.listConversationMessages(convSID);
  messages = filterMessages(messages);

  return getConversationPairs(messages);
}

function filterMessages(msgs) {
  let cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - 1);

  // First filtering is to filter the messages exchanged within the last month
  msgs = msgs.filter(msg => new Date(msg.date_created) >= cutoff);

  // Second filtering is to parse all messages and obtain question & answer pairs
  const convPairs = getConversationPairs(msgs);
}

/**
 * We can only analyse pairs of messages where the user has replied to a message we've
 * sent to them. So parse the provided array of messages into these question & answer pairs.
 *
 * Returns array of message pair objects (see example structure at the bottom of this file)
 */
function getConversationPairs(msgs) {
  // Assume that the messages are in ascending order, as that is the default for the API call to list conversation messages
  // TODO: Sort the msgs array so we're not relying on the order returned from the API call

  // Iterate through the messages and pick off pairs
  let messagePairs = [];
  let index = 0;
  const numMsgs = msgs.length;

  while(index < numMsgs) {
    const currentMsg = msgs[index];
    const nextMsg = (index+1 < numMsgs) ? msgs[index + 1] : null;

    if(!currentMsg.participant_sid) {
      // This means that we're looking at an outbound message (question) rather than an inbound message (answer) because
      // inbound messages (answers) always contain a 'participant_sid'

      // Ensure the next message in the conversation is an inbound message (answer)
      if( (nextMsg != null) && (nextMsg.participant_sid) ) {
        let pair = {
          "question": currentMsg.body,
          "type": getQuestionType(currentMsg),
          "reply": nextMsg.body,
          "target": getReplyTarget(nextMsg),
          "day": getDay(nextMsg)
        }

        messagePairs.push(pair);
        index += 2;
      } else {
        // Move onto the next message in the conversation, as we didn't get a reply to the current question
        index++;
      }
    } else {
      // A conversation pair should always lead with an outbound message (question), so move onto the next msg in the conversation
      index++;
    }
  }

  return messagePairs;
}

function getQuestionType(msg) {
  // TODO
  return msg.body;
}

function getReplyTarget(msg) {
  // TODO
  return msg.body;
}

function getDay(msg) {
  return weekday[new Date(msg.date_created).getDay()];
}

// Module exports
const MonthlyModule = {
  conversationAnalysis
}

module.exports.conversationAnalysis = MonthlyModule.conversationAnalysis;
module.exports = MonthlyModule;

/**
  What we ideally want to get to is a list of objects where each object contains:
    * Question - message body that was sent to the user
    * Type - attempt to classify which type of question this was
    * Reply - message body that was received from the user in response to the question
    * Reply Target - this could be a 1 word reply, 'GOOD'/'OK'/'BAD', or a number from a 1-10 rating question

  An example of the conversation analysis that we might get:
      [
        {
          question: "How's today been so far? 💭\n\nInclude GOOD/OK/BAD in your reply.",
          type: "options"
          reply: "Pretty good so far",
          target: "good",
          day: "Friday"
        },
        {
          question: "Rate your day! 🙋\n\nReply 0-10, where 10 is a great day.",
          type: "rating",
          reply: "Today was a 7",
          target: "7",
          day: "Wednesday"
        },
        {
          question: "\"One word to describe today: __________.\" ✍️\n\nReply with 1 word!",
          type: "open",
          reply: "Catastrophic 😩",
          target: "Catastrophic",
          day: "Monday"
        }
      ]
*/