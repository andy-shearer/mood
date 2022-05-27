import SMSHandler from "../scripts/SMSHandler.js";
import Daily from "../scripts/Daily";
import { getAllUsers } from "./user.service";

const getMsg = function () {
  if(new Date().getHours() < 12) {
    return Daily.getMorningMsg();
  } else {
    return Daily.getAfternoonMsg();
  }
}

export async function sendScheduledMessages() {
  const msgBody = getMsg();

  await getAllUsers(users => {

    for(let i = 0; i<users.length; i++) {
      const user = users[i];
      if(user.participantId) {
        // Send SMS to user
        SMSHandler.sendMessage(user.participantId, msgBody);
      }
    }

  });

}
