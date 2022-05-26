import { Response, Request, Express } from "express";
import {
  createContactHandler,
  getContactInfoHandler,
  updateContactInfoHandler,
} from "./controllers/contact.controller";
import { check } from "express-validator";
import { checkSchema } from "express-validator";
import { googleOauthHandler } from "./controllers/session.controller";
import { webhookHandler } from "./controllers/webhook.controller";

import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  // Performance & healthCheck
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // OAuth
  app.get("/api/sessions/oauth/google", googleOauthHandler);

  // Create user contact details
  app.post(
    "/api/contact",
    [requireUser, check("mobile").exists()],
    createContactHandler
  );

  // Get user contact details
  app.get("/api/contact/:contactId", requireUser, getContactInfoHandler);

  // Update user contact details
  app.put(
    "/api/contact/:contactId/:participantId",
    [requireUser, check("mobile").exists()],
    updateContactInfoHandler
  );
  // Webhook handler for SMS events
  app.get("/webhook", webhookHandler);
}

export default routes;
