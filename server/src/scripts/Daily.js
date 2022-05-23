const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}

function getMessage() {
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
  getMessage
}

module.exports.getMessage = DailyModule.getMessage;
module.exports = DailyModule;

// Daily Questions
const questions = [
  "\"Today I'm feeling __________.\" ✍️\n\nReply with 1 word!",
  "How's today been so far? 💭\n\nInclude GOOD/OK/BAD in your reply.",
  "How is your day going? 💬\n\nInclude GOOD/OK/BAD in your reply.",
  "It's {0}! How are you doing today? 🤔\n\nInclude GOOD/OK/BAD in your reply.",
  "Tell me how you're feeling! 🧠\n\nInclude GOOD/OK/BAD in your reply."
]