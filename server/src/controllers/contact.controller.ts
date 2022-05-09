import { Request, Response } from "express";
import { createContact } from "../services/contact.service";
import { validationResult } from "express-validator";
import log from "../utils/logger";

const createContactHandler = async (req: Request, res: Response) => {
  const body = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const contact = await createContact(body);

    return res.send(contact);
  } catch (error: any) {
    log.error(error);
    return res.status(409).send(error.message);
  }
};

export default createContactHandler;
