import { Request, Response } from "express";
import { createContact, findContact } from "../services/contact.service";
import { validationResult } from "express-validator";
import log from "../utils/logger";
import mongoose from "mongoose";

export async function createContactHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  // console.log(userId);
  const body = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const contact = await createContact({
      ...body,
      user: userId,
    });

    return res.send(contact);
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}

export async function getContactInfoHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const contact = await findContact({ userId });

  if (!contact) {
    return res.sendStatus(404);
  }

  return res.send(contact);
}
