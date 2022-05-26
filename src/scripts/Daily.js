/**
 * Returns a random daily question from a set of possible questions. Split into questions to ask in the morning and
 * questions for the afternoon.
 */

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}

function getMorningMsg() {
  return getMessage("morning");
}

function getAfternoonMsg() {
  return getMessage("afternoon");
}

function getMessage(timeOfDay) {
  let questions;
  if(timeOfDay === "morning") {
    questions = morningQuestions;
  } else {
    questions = afternoonQuestions;
  }
  const randIndex = Math.floor((Math.random() * questions.length));
  const randQ = questions[randIndex];

  // Include day of week if question contains substitution
  if(randQ.includes("{0}")) {
    return randQ.format(getDay());
  } else {
    return randQ;
  }
}

function getDay() {
  return weekday[new Date().getDay()];
}

// Module exports
const DailyModule = {
  getMorningMsg,
  getAfternoonMsg
}

module.exports.getMorningMsg = DailyModule.getMorningMsg;
module.exports.getAfternoonMsg = DailyModule.getAfternoonMsg;
module.exports = DailyModule;

// Daily Questions for the morning
const morningQuestions = [
  "\"Today I'm feeling __________.\" ✍️\n\nReply with 1 word!",
  "How's today been so far? 💭\n\nInclude GOOD/OK/BAD in your reply.",
  "How is your day going? 💬\n\nInclude GOOD/OK/BAD in your reply.",
  "It's {0}! How are you doing today? 🤔\n\nInclude GOOD/OK/BAD in your reply.",
  "Tell me how you're feeling! 🧠\n\nInclude GOOD/OK/BAD in your reply."
]

// Daily Questions for the afternoon
const afternoonQuestions = [
  "\"One word to describe today: __________.\" ✍️\n\nReply with 1 word!",
  "Overall, how did you feel today? 💭\n\nInclude GOOD/OK/BAD in your reply.",
  "How was your day today? 💬\n\nInclude GOOD/OK/BAD in your reply.",
  "You made it through {0}! How has it been? 🤔\n\nInclude GOOD/OK/BAD in your reply.",
  "Rate your day! 🙋\n\nReply 0-10, where 10 is a great day."
]