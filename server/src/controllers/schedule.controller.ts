import { Request, Response } from "express";
import log from "../utils/logger";
import { sendScheduledMessages } from "../services/schedule.service";
const check = "dciCs93B3vK6R5PF56k66g";

export async function scheduledSendHandler(req: Request, res: Response) {
  const token = req.query.token as string;
  //log.debug(req);
  if (!token || token !== check) {
    res.status(401);
  }

  const date = new Date();
  const hrs = date.getHours();
  if((hrs == 10) || (hrs == 16)) { // Schedule send around 10am and 4pm
    sendScheduledMessages();
  }

  res.status(200);
}